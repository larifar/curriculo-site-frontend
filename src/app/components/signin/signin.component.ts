import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
email = '';
password = '';
msg = '';

  constructor(private router: Router, private authService: AuthServiceService) {}

  async onSubmit() {
    this.msg = '';
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      this.msg = 'Login inválido!';
      if (error instanceof Error) {
        this.msg += ' ' + error.message;
      }
    }
  }
}
