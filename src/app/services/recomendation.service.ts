import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecomendationService {

    constructor(
        private http: HttpClient) { }

    addReview(review: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/api/specialists/add-review`, review);
    }

    getSpecialistReviews(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/specialists/${id}/reviews`)
            .pipe(
                map((res: any) => {
                    return res.body.data;
                }))
    }

}
