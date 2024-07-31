import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProfile } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  urlPath = 'https://icherniakov.ru/yt-course/';

  getTestProfiles() {
    return this.http.get<IProfile[]>(`${this.urlPath}account/test_accounts`);
  }
}
