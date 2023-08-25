import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestServiceService {

    constructor(
        private http: HttpClient
    ) { }


    public requestService(data: any): Observable<any> {
        let formData = new FormData();

        formData.append('phone_number', data.phone_number.toString());
        formData.append('category_id', data.category_id.toString());

        return this.http.post(`${environment.apiUrl}/api/make/call`, formData);
    }

}
