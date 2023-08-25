import { Injectable } from '@angular/core';
import { futureDateCreator } from '@utils/utils';
import { CookieOptions, CookieService } from 'ngx-cookie';

const ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  getToken(): string {
    return this.cookieService.get(ACCESS_TOKEN);
  }

  saveToken(token: any): void {
    let futureDate = futureDateCreator();
    let options: CookieOptions = {
      expires: futureDate
    }

    this.cookieService.put(ACCESS_TOKEN, token.access_token, options);
  }

  removeToken(): void {
    this.cookieService.remove(ACCESS_TOKEN);
  }

}
