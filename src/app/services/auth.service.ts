import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  urlPath = 'https://icherniakov.ru/yt-course/';

  login(payload: Partial<{ username: string; password: string }>) {
    const formData = new FormData();
    if (payload.username && payload.password) {
      formData.append('username', payload.username);
      formData.append('password', payload.password);
    }
    return this.http.post(`${this.urlPath}auth/token`, formData);
  }
}
