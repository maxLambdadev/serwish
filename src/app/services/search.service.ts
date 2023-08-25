import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(
        private http: HttpClient) { }


    //Refactor whole search
    getSearchItems(searchText: string): Observable<Array<any>> {
        return this.http.post(`${environment.apiUrl}/api/search?where[]=services&&where[]=categories&&where[]=specialist&&key=${searchText}`, {})
            .pipe(
                tap((res: any) => {
                    return res.body;
                })
            )
    }
}
