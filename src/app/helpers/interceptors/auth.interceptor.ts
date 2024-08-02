import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authServise = inject(AuthService);
  const token = authServise.tokenData.access_token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProcced(authServise, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProcced(authServise, req, next);
      }
      return throwError(error);
    })
  );
};

const refreshAndProcced = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken().pipe(
      switchMap(() => {
        isRefreshing = false;
        return next(addToken(req, authService.tokenData.access_token));
      })
    );
  }
  return next(addToken(req, authService.tokenData.access_token));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
