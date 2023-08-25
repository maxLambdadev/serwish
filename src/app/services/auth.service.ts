import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchUser } from '@store/user/user.actions';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

const OAUTH_CLIENT = '956b1f77-89aa-4902-ad4f-0d67bbffc4bf';
const OAUTH_SECRET = 'secret';
const API_URL = environment.apiUrl;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Buffer.from(OAUTH_CLIENT + ':' + OAUTH_SECRET).toString('base64')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';

  constructor(private http: HttpClient, private tokenService: TokenService, private store: Store) { }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http.post<any>(API_URL + '/api/auth/login', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.body);
          this.store.dispatch(fetchUser());
        })
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + '/api/auth/login', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.body);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + '/api/register', data);
  }

}
