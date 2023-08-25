import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';

import { Specialist, SpecialistFilterArgs, PageData } from '@models/index';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class SpecialistsService {

    constructor(
        private http: HttpClient) { }


    getSpecialists(args: SpecialistFilterArgs): Observable<PageData> {

        let paramObj: SpecialistFilterArgs = {
            locale: args.locale,
            page: args.page,
            perPage: args.perPage,
            has_serwish_quality: args.has_serwish_quality,
            personal: args.personal,
            cities: args.cities,
            categories: args.categories
        }

        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<PageData>(`${apiUrl}/api/specialists/list?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))
    }

    getSpecialist(id: number): Observable<Specialist> {

        let paramObj = {
            user_id: id
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<Specialist>(`${apiUrl}/api/specialists/${id}?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))

    }

    getSpecialistServices(id: number, args: SpecialistFilterArgs): Observable<PageData> {

        let paramObj = {
            ...args,
            user_id: id
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<PageData>(`${apiUrl}/api/specialists/${id}/services?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))

    }

}
