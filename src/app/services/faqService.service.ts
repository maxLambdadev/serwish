import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/internal/Observable';
@Injectable({
    providedIn: 'root'
})
export class FaqService {

    constructor(
        private http: HttpClient
    ) { }


    getFaq(locale: string): Observable<Array<any>> {

        let paramObj = {
            "locale": locale
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${environment.apiUrl}/api/faq?` + qParams)
            .pipe(
                map((faq: any) => {
                    return faq.body;
                }))
    }


}
