import { CanActivateFn, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);
  const token = await auth.getCurrentSession().catch(() => null);
  return token
    ? true
    : router.createUrlTree(['/login']);
};
