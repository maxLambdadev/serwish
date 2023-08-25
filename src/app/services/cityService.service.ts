import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators'
import { UrlQueryParams } from '@utils/urlQueryParamsMap';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CitiesService {


    constructor(
        private translateService: TranslateService,
        private http: HttpClient) { }


    syncCities(tags: any): Observable<any> {

        return this.http.post(`${apiUrl}/api/services/city/sync`, tags)
            .pipe(
                tap((res: any) => {
                    return res.body;
                })
            )
    }

    getCities(name: string): Observable<any> {

        //Fix locale , should get from queryParams
        let paramObj = {
            locale: this.translateService.currentLang,
            name: name
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${apiUrl}/api/services/city/search?` + qParams)
            .pipe(
                map((cities: any) => {
                    return cities.body;
                }))

    }

    getCitiesList(): Observable<any> {

        //Fix locale , should get from queryParams
        let paramObj = {
            locale: this.translateService.currentLang
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${apiUrl}/api/services/city/list?` + qParams)
            .pipe(
                map((cities: any) => {
                    return cities.body.data;
                }))

    }

}
