import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;


@Injectable({
    providedIn: 'root'
})
export class ClickService {

    constructor(
        private http: HttpClient
    ) { }

    click(id: any): void {
        let formData = new FormData();

        formData.append('service_id', id.toString());

        this.http.post(`${apiUrl}/api/services/count/click`, formData).subscribe();
    }


}
