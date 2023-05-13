import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertService } from '../service/Alert.service';
import { catchError, throwError } from 'rxjs';
import { BibliotecaConstant } from '../constants/BibliotecaConstant';

export function httpErrorResponseInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const _alertService = inject(AlertService);
  console.log('init interceptor -> {}');

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 500) {
        _alertService.notification(
          BibliotecaConstant.TITLE_REQUEST_HTTP_SERVER_ERROR,
          BibliotecaConstant.VC_ERROR
        );
      }
      return throwError(error);
    })
  );
}
