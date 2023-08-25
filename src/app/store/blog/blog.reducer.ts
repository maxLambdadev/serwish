import { Action, createReducer, on } from '@ngrx/store';
import * as blogActions from './blog.actions';
import { BlogFilterArgs, Blog, LoadingStatus } from '@models/index';

export interface BlogState {
  blogs: Array<Blog>;
  blogsLoadingStatus: LoadingStatus
  pageSize: number;
  currentPage: number;
  blogFilterArgs: BlogFilterArgs;
  sortProperty: string;
  sortDirection: 'asc' | 'desc';
  blog: Blog;
  blogLoadingStatus: LoadingStatus;
}

export const blogInitState: BlogState = {
  blogs: new Array<Blog>(),
  blogsLoadingStatus: LoadingStatus.NOT_LOADED,
  pageSize: 100,
  currentPage: 1,
  blogFilterArgs: {} as BlogFilterArgs,
  sortProperty: 'id',
  sortDirection: 'desc',
  blog: {} as Blog,
  blogLoadingStatus: LoadingStatus.NOT_LOADED
};

const _blogReducer = createReducer(
  blogInitState,


  /**
 * fetch blog list actions
 */
  on(blogActions.fetchBlogs, (state: BlogState, action) => {
    return {
      ...state,
      blogFilterArgs: action.blogFilterArgs,
      blogs: [],
      blogsLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(blogActions.fetchBlogsSuccess, (state: BlogState, action) => {
    return {
      ...state,
      blogs: [...action.blogs],
      blogsLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(blogActions.fetchBlogsFailure, (state: BlogState, _action) => {
    return {
      ...state,
      blogLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
   * fetch single blog actions
   */
  on(blogActions.fetchBlog, (state: BlogState, action) => {
    const loadingStatus: LoadingStatus =
      state.blog?.id == action.blogDetailsParams.id
        ? LoadingStatus.LOADED
        : LoadingStatus.LOADING;
    return {
      ...state,
      blogLoadingStatus: loadingStatus
    };
  }),
  on(blogActions.fetchBlogSuccess, (state: BlogState, action) => {

    return {
      ...state,
      blog: {
        ...action.blog
      },
      blogLoadingStatus: LoadingStatus.LOADED,
    };
  }),
  on(blogActions.fetchBlogFailure, (state: BlogState, _action) => {
    return {
      ...state,
      blogLoadingStatus: LoadingStatus.EMPTY
    };
  }),


);

export function blogReducer(state: BlogState, action: Action) {
  return _blogReducer(state, action);
}