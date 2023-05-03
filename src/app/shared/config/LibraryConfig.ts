import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
