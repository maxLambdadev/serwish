import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { UrlQueryParams } from '@utils/urlQueryParamsMap';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PhoneReviewService {

    constructor(
        private http: HttpClient) { }

    servicePhoneReview(serviceId: number, value: number): Observable<any> {

        let paramObj = {
            "value": value,
            "service_id": serviceId
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${environment.apiUrl}/api/services/call/review?` + qParams)
            .pipe(map((res: any) => {
                return res;
            }))

    }

    specialistPhoneReview(specialistId: number, value: number): Observable<any> {

        let paramObj = {
            "value": value,
            "user_id": specialistId
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get(`${environment.apiUrl}/api/services/call/specialist/review?` + qParams)
            .pipe(map((res: any) => {
                return res;
            }))

    }

}
