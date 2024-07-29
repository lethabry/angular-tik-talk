import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IProfile } from './interfaces/interfaces';
import { ProfileItemComponent } from './profile-item/profile-item.component';
import { ProfileService } from './services/profile.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileItemComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tik-talk';
  profileServise = inject(ProfileService);
  profiles: IProfile[] = [];

  constructor() {
    this.profileServise.getTestProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
