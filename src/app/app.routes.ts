import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { MainProfileComponent } from './pages/main-profile/main-profile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { canActivateAuth } from './helpers/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'profile/:id',
        component: MainProfileComponent,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
