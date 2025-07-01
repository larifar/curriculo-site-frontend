import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { catchError, EMPTY, from, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next : HttpHandlerFn) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const snack = inject(MatSnackBar);

  return from(authService.getCurrentSession()).pipe(
    switchMap((token) => {
      const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
      return next(authReq);
    }),
    catchError((error: HttpErrorResponse) =>{
      if ([400, 401, 403].includes(error.status)) {
        snack.open('Sessão expirada, faça login novamente.', 'OK', { duration: 2000 })
        .afterDismissed()
        .subscribe(() => router.navigate(['/login']));

        authService.signOut();
        return EMPTY;
      }
      throw error;
    })
  )
};
