import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';

import { Service, ServiceFilterArgs, ExtPageData, PageData } from '@models/index';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    constructor(
        private http: HttpClient,
        private translateService: TranslateService,
    ) { }


    getServices(args: ServiceFilterArgs): Observable<ExtPageData> {

        let paramObj = {
            locale: args.locale,
            page: args.page,
            perPage: args.perPage,
            has_serwish_quality: args.has_serwish_quality,
            personal: args.personal,
            categories: args.categories,
            ids: args.ids,
            noSort: args.noSort,
            cities: args.cities
        }

        let qParams = new UrlQueryParams(paramObj);

        const services: Observable<ExtPageData> = this.http.get<ExtPageData>(`${environment.apiUrl}/api/services/list?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))


        return services;
    }

    getService(id: number, locale: string): Observable<Service> {

        return this.http.get<Service>(`${environment.apiUrl}/api/services/${id}/${locale}`)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))
    }

    getMyServices(args: ServiceFilterArgs): Observable<PageData> {

        //Get from queryParams
        let locale = this.translateService.currentLang;

        let paramObj = {
            ...args,
            locale: locale,
        }

        return this.http.post(`${environment.apiUrl}/api/user/services`, paramObj)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

    getVipList(): Observable<any> {

        return this.http.get(`${environment.apiUrl}/api/packet-list`)
            .pipe(
                map((packets: any) => {
                    return packets.body;
                }))

    }

    boostService(packet_id: number, service_id: number): Observable<any> {

        let formData = new FormData();

        formData.append('packet_id', packet_id.toString());
        formData.append('service_id', service_id.toString());

        return this.http.post(`${environment.apiUrl}/api/services/orders/create-payment`, formData)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

}
