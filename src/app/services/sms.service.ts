import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SmsService {

    constructor(
        private http: HttpClient) { }


    sendSMS(phoneNumber: number): Observable<any> {

        const body = new HttpParams()
            .set('phone_number', phoneNumber)

        return this.http.post(`${environment.apiUrl}/api/send-sms`, body)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )

    }

    checkSMS(phoneNumber: number, smsValidation: number): Observable<any> {

        const body = new HttpParams()
            .set('phone_number', phoneNumber)
            .set('sms_validation', smsValidation)

        return this.http.post(`${environment.apiUrl}/api/check-sms`, body);
    }

    changeSMS(phoneNumber: number, smsValidation: number, password: string, passwordConfirmation: string): Observable<any> {

        const body = new HttpParams()
            .set('phone_number', phoneNumber)
            .set('sms_validation', smsValidation)
            .set('password', password)
            .set('password_confirmation', passwordConfirmation)

        return this.http.post(`${environment.apiUrl}/api/change-sms`, body)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )

    }


}
