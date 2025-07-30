import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole();

  if (authService.isLoggedIn() && role === 'Admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};