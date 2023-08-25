import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AddServiceService {

    constructor(
        private http: HttpClient) { }

    createServiceBasic(data: any): Observable<any> {

        return this.http.post(`${apiUrl}/api/services/create-basic`, data)
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

    updateServiceBasic(data: any): Observable<any> {
        return this.http.post<any>(`${apiUrl}/api/services/update-basic`, data);
    }

}
