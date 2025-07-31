import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatformService } from './platform.service';

export const accountInterceptor: HttpInterceptorFn = (req, next) => {

  const platform = inject(PlatformService);

  if (platform.isBrowser()) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req);
};
