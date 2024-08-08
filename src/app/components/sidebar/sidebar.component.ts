import { Component, inject } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { SubscriberItemComponent } from '../subscriber-item/subscriber-item.component';
import { ProfileService } from '../../services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SvgComponent,
    NgFor,
    SubscriberItemComponent,
    CommonModule,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  me = this.profileService.me;

  subscribers$ = this.profileService.getSubscribers();

  navigationItems = [
    { name: 'Моя страница', svg: 'home', link: '' },
    { name: 'Чаты', svg: 'chat', link: '' },
    { name: 'Поиск', svg: 'search', link: '' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
