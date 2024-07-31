import { Component, inject } from '@angular/core';
import { IProfile } from '../../interfaces/interfaces';
import { ProfileService } from '../../services/profile.service';
import { ProfileItemComponent } from '../../components/profile-item/profile-item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProfileItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  profileServise = inject(ProfileService);
  profiles: IProfile[] = [];

  constructor() {
    this.profileServise.getTestProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
