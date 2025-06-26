import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [ NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
profile:any;
private http = inject(HttpClient);

ngOnInit() {
  this.http.get( `${environment.apiUrl}/profile`)
  .subscribe((data) => (this.profile = data))
}
}
