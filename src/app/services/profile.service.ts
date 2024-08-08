import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProfile } from '../interfaces/interfaces';
import { IPagable } from '../interfaces/interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  urlPath = 'https://icherniakov.ru/yt-course/';

  me = signal<IProfile | null>(null);

  getTestProfiles() {
    return this.http.get<IProfile[]>(`${this.urlPath}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<IProfile>(`${this.urlPath}account/me`)
      .pipe(tap((data) => this.me.set(data)));
  }

  getSubscribers(num: number) {
    return this.http
      .get<IPagable<IProfile>>(`${this.urlPath}account/subscribers/`)
      .pipe(map((data) => data.items.slice(0, num)));
  }

  getProfile(id: string) {
    return this.http
      .get<IProfile>(`${this.urlPath}account/${id}`)
      .pipe(tap((data) => this.me.set(data)));
  }
}
