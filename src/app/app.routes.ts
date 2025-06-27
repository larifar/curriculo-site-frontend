import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SigupComponent } from './components/sigup/sigup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SigupComponent },

];
