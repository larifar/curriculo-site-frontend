import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SigupComponent } from './components/sigup/sigup.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [() => import('./guards/auth.guard').then(m => m.authGuard)] },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SigupComponent },

];
