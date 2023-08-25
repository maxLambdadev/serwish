import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
  catchError,
  filter,
  map,
  switchMap
} from 'rxjs/operators';

import * as blogActions from './blog.actions';

import {
  RouterNavigatedAction,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';

import { RouterStateUrl } from '../../sw-route.serilizer';
import { Blog, BlogFilterArgs } from '@models/blog';
import { SeoService, BlogsService } from '@services/index';
import { of } from 'rxjs';

const { convert } = require('html-to-text');

@Injectable({
  providedIn: 'root'
})
export class BlogEffects {
  constructor(
    private seoService: SeoService,
    private actions$: Actions,
    private blogsService: BlogsService,
  ) { }


  //Blogs
  blogsPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;

        return url == '/blog' || url.startsWith('/blog?');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      map(queryParams => {

        const args: BlogFilterArgs = {
          locale: queryParams.locale || 'ka',
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 16
        };

        return blogActions.fetchBlogs({ blogFilterArgs: args });
      })
    )
  );

  fetchBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blogActions.fetchBlogs),
      map(action => action.blogFilterArgs),
      switchMap((args: BlogFilterArgs) => {
        return this.blogsService.getBlogs(args).pipe(
          map((blogs: Blog[]) => {
            return blogActions.fetchBlogsSuccess({ blogs: blogs });
          }),
          catchError((err: any) =>
            of(blogActions.fetchBlogFailure({ err: err }))
          )
        );
      })
    )
  );

  //Blog Details
  blogPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url.startsWith('/blog/');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {

        let blogDetailsParams: { locale: string, id: number } = {
          locale: action.payload.routerState.queryParams.locale,
          id: action.payload.routerState.params.id
        }

        return blogDetailsParams;
      }),
      map((params: { locale: string, id: number }) => {

        const blogDetailsParams: { locale: string, id: number } = {
          locale: params.locale || "ka",
          id: params.id
        }

        return blogActions.fetchBlog({ blogDetailsParams: blogDetailsParams });
      })
    )
  );

  fetchBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blogActions.fetchBlog),
      map(action => action.blogDetailsParams),
      switchMap((params: { locale: string, id: number }) => {
        return this.blogsService.getBlog(params.id, params.locale).pipe(
          map((blog: Blog) => {

            //SEO Stuff Start
            let description = convert(blog?.translated?.description, { wordwrap: 130 });
            this.seoService.setDetailSeo(blog?.translated?.title, description);
            //SEO Stuff End

            return blogActions.fetchBlogSuccess({ blog: blog });
          }),
          catchError((err: any) =>
            of(blogActions.fetchBlogFailure({ err: err }))
          )
        );
      })
    )
  );
}
