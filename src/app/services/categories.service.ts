import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesFilterArgs, Category } from '@models/index';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(
        private http: HttpClient
    ) { }


    getCategories(args: CategoriesFilterArgs): Observable<Category[]> {

        let paramObj = {
            "locale": args.locale
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<Category[]>(`${apiUrl}/api/categories/list?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))
    }

}
