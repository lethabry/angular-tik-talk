import { Component, input } from '@angular/core';
import { IProfile } from '../../interfaces/interfaces';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SvgComponent } from '../svg/svg.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, SvgComponent, RouterModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<IProfile>();
}
