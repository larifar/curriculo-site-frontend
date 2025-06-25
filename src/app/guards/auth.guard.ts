import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const token = await authService.getCurrentSession()

  if (token) {
    return true;          // libera rota
  } else {
    router.navigate(['/login']);
    return false;         // bloqueia e redireciona
  }
};
