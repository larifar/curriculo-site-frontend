import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-sigup',
  imports: [NgIf, FormsModule],
  templateUrl: './sigup.component.html',
  styleUrl: './sigup.component.css'
})
export class SigupComponent {
email = '';
password = '';
msg = '';

  constructor(private router: Router, private authService: AuthServiceService) {}

  async onSubmit() {
    this.msg = '';
    try {
      await this.authService.signUp(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error) {
      this.msg = 'Erro ao criar cadastro! ';
      if (error instanceof Error) {
        this.msg += error.message;
      }
    }
  }
}
