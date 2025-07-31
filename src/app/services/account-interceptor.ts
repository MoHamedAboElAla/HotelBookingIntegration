import { HttpInterceptorFn } from '@angular/common/http';

export const accountInterceptor: HttpInterceptorFn = (req, next) => {
const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
