import { Component, Input } from '@angular/core';
import { IProfile } from '../interfaces/interfaces';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss',
})
export class ProfileItemComponent {
  @Input() profile!: IProfile;
}
