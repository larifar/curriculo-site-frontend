import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [NgIf, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
profile:any;
private authService = inject(AuthServiceService);
private http = inject(HttpClient);
private router = inject(Router);

ngOnInit() {
  this.http.get(`${environment.apiUrl}/profile`)
    .subscribe({
      next: data => this.profile = data,
      error: () => this.router.navigate(['/login'])
    });
}

handleLogout() {
this.authService.signOut()
  .then(() => this.router.navigate(['/login']))
  .catch(console.error);
}
}
