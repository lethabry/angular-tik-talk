import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from '../../components/post-feed/post-feed.component';
@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    CommonModule,
    ImgUrlPipe,
    RouterModule,
    PostFeedComponent,
  ],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.scss',
})
export class MainProfileComponent {
  profileService = inject(ProfileService);
  activatedRoute = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribers(5);

  profile$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }
      return this.profileService.getProfile(id);
    })
  );
}
