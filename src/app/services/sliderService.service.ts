import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlQueryParams } from '@utils/urlQueryParamsMap';
import { Observable } from "rxjs/internal/Observable";
import { Slider } from '@models/index';
import {environment} from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class SliderService {

    constructor(
        private http: HttpClient
    ) { }

    getSlider(locale: string): Observable<Array<Slider>> {

        let paramObj = {
            locale: locale
        }
        let qParams = new UrlQueryParams(paramObj);

        return this.http.get<Array<Slider>>(`${environment.apiUrl}/api/slider?` + qParams)
            .pipe(
                map((res: any) => {
                    return res.body;
                }))
    }


}
