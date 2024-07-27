import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileItemComponent } from './profile-item/profile-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tik-talk';
}
