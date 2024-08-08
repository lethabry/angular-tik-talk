import { Component, Input } from '@angular/core';
import { IProfile } from '../../interfaces/interfaces';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-item',
  standalone: true,
  imports: [ImgUrlPipe],
  template: ` <li class="subscriber-item">
    <img [src]="subscriber.avatarUrl | imgUrl" alt="Аватар пользователя" />
    <span>{{ subscriber.firstName }} {{ subscriber.lastName }}</span>
  </li>`,
  styleUrl: './subscriber-item.component.scss',
})
export class SubscriberItemComponent {
  @Input() subscriber!: IProfile;
}
