import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private http: HttpClient) { }

    submitContact(data: any): Observable<any> {

        let formData = new FormData();

        formData.append('phone', data.phone.toString());
        formData.append('title', data.title.toString());
        formData.append('description', data.description.toString());
        formData.append('email', data.email.toString());

        return this.http.post(`${environment.apiUrl}/api/make/contact`, formData);
    }
}
