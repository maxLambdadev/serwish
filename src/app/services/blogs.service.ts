import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';
import { environment } from '../../environments/environment';

import { Blog, BlogFilterArgs } from '@models/index';
import { Observable } from 'rxjs/internal/Observable';

const apiUrl = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    constructor(
        private http: HttpClient,
    ) { }


    getBlogs(args: BlogFilterArgs): Observable<Blog[]> {

        let paramObj = {
            ...args
        }

        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<Blog[]>(apiUrl + `/api/posts/list?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

    getBlog(id: number, locale: string): Observable<Blog> {

        return this.http.get<Blog>(apiUrl + `/api/posts/${id}/${locale}`)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))
    }

}
