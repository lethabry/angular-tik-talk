import { Component, HostListener, Input } from '@angular/core';
import { IProfile } from '../../interfaces/interfaces';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss',
})
export class ProfileItemComponent {
  screenResize = window.innerWidth;
  @Input() profile!: IProfile;
}
