import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
profile:any;
private http = inject(HttpClient);
private router = inject(Router);

ngOnInit() {
  this.http.get(`${environment.apiUrl}/profile`)
    .subscribe({
      next: data => this.profile = data,
      error: () => this.router.navigate(['/login'])
    });
}
}
