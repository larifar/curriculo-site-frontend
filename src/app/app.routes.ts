import { Routes } from '@angular/router';
import { SimpleLoginComponent } from './components/simple-login.component';
import { HomeComponent } from './components/home.component';

export const routes: Routes = [
  { path: '', component: SimpleLoginComponent },
  { path: 'home', component: HomeComponent },
  // ...outras rotas...
];
