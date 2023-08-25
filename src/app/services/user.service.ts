import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '@models/index';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient) { }


    getUser(): Observable<User> {
        return this.http.post<User>(`${apiUrl}/api/user/me`, {})
            .pipe(
                map((res: any) => {
                    return res.body;
                })
            )
    }

    updateUser(data: any) {
        let formData = new FormData();

        formData.append('phone_number', data.phone_number.toString());
        formData.append('category_id', data.category_id.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

    updateUserPhone(data: any) {
        let formData = new FormData();

        formData.append('phone_number', data.new_phone_number.toString());
        formData.append('sms_validation', data.sms_validation.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

    updateUserOveralInfo(data: any) {
        let formData = new FormData();

        formData.append('date_of_birth', data.date_of_birth.toString());
        formData.append('gender', data.gender.toString());
        formData.append('name', data.name.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

    updatePassword(data: any) {
        let formData = new FormData();

        formData.append('password', data.password.toString());
        formData.append('password_confirmation', data.password_confirmation.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

    updateSpecialistInfo(data: any) {
        let formData = new FormData();

        formData.append('id_number', data.id_number.toString());
        formData.append('personal', data.personal.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

    updateUserType(data: any) {
        let formData = new FormData();

        formData.append('client_type', data.client_type.toString());
        formData.append('id_number', data.id_number.toString());
        formData.append('personal', data.personal.toString());

        return this.http.post(`${apiUrl}/api/user/update`, formData);
    }

}
