import { inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../service/Alert.service';
import { BibliotecaConstant } from '../constants/BibliotecaConstant';

const getRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 de ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
  return `${startIndex + 1} a ${endIndex} de ${length}`;
};

export function customMatPaginatorInitl() {
  const matPaginatorInitl: MatPaginatorIntl = new MatPaginatorIntl();

  matPaginatorInitl.itemsPerPageLabel = 'Filas por página';
  matPaginatorInitl.nextPageLabel = 'página Siguiente';
  matPaginatorInitl.previousPageLabel = 'página Anterior';
  matPaginatorInitl.firstPageLabel = 'Primera página';
  matPaginatorInitl.lastPageLabel = 'Última página';
  matPaginatorInitl.getRangeLabel = getRangeLabel;
  return matPaginatorInitl;
}

export function successNotification(msg: string, snackBar: MatSnackBar) {
  return snackBar.open(msg, '', configSnackBar);
}

const configSnackBar: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
};

export function ErrorInterceptor(
  requet: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const alertService = inject(AlertService);
  console.log('Init interceptor -> {} ' + requet);
  return next(requet).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        alertService.notification(
          BibliotecaConstant.TITLE_REQUEST_HTTP_SERVER_ERROR,
          BibliotecaConstant.VC_ERROR
        );
      }
      if (error.status === 404) {
        alertService.notification(
          BibliotecaConstant.TITLE_REQUEST_HTTP_CLIENT_ERROR_NOT_FOUND,
          BibliotecaConstant.VC_ERROR
        );
      }
      return throwError(error);
    })
  );
}
