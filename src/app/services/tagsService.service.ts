import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TagsService {


    constructor(
        private translateService: TranslateService,
        private http: HttpClient) { }

    syncTags(tags: any): Observable<any> {

        return this.http.post(`${environment.apiUrl}/api/services/tags/sync`, tags)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

    getTags(name: string): Observable<any> {

        //Fix locale , should get from queryParams
        let paramObj = {
            locale: this.translateService.currentLang,
            name: name
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${environment.apiUrl}/api/services/tags/search?` + qParams)
            .pipe(
                map((tags: any) => {
                    return tags.body;
                }))

    }
}
