import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthToken } from '../interfaces/interfaces';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  urlPath = 'https://icherniakov.ru/yt-course/';

  tokenData: IAuthToken = { access_token: '', refresh_token: '' };
  cookieService = inject(CookieService);
  router = inject(Router);

  get isAuth() {
    if (!this.tokenData.access_token) {
      this.tokenData.access_token = this.cookieService.get('token');
      this.tokenData.refresh_token = this.cookieService.get('refreshToken');
    }

    return !!this.tokenData.access_token;
  }

  login(payload: Partial<{ username: string; password: string }>) {
    const formData = new FormData();
    if (payload.username && payload.password) {
      formData.append('username', payload.username);
      formData.append('password', payload.password);
    }
    return this.http
      .post<IAuthToken>(`${this.urlPath}auth/token`, formData)
      .pipe(
        tap((data) => {
          this.tokenData.access_token = data.access_token;
          this.tokenData.refresh_token = data.refresh_token;

          this.cookieService.set('token', this.tokenData.access_token);
          this.cookieService.set('refreshToken', this.tokenData.refresh_token);
        })
      );
  }

  refreshAuthToken() {
    return this.http
      .post<IAuthToken>(`${this.urlPath}auth/refresh`, {
        refresh_token: this.tokenData.refresh_token,
      })
      .pipe(
        tap((res) => {
          this.tokenData.access_token = res.access_token;
          this.tokenData.refresh_token = res.refresh_token;

          this.cookieService.set('token', this.tokenData.access_token);
          this.cookieService.set('refreshToken', this.tokenData.refresh_token);
        }),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    return this.http.post(`${this.urlPath}auth/token`, {}).pipe(
      tap(() => {
        this.cookieService.deleteAll();
        this.tokenData = { access_token: '', refresh_token: '' };
        this.router.navigate(['login']);
      })
    );
  }
}
