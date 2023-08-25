import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';

import { Observable } from 'rxjs/internal/Observable';
import { Ads } from '@models/ads';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdsService {

    constructor(
        private http: HttpClient
    ) { }

    getAds(pageName: string): Observable<Ads[]> {

        let paramObj = {
            page: pageName
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<Ads[]>(`${environment.apiUrl}/api/sxva-ragac?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }));
    }


}
