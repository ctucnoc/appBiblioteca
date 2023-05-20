import { Subscription, merge, startWith, switchMap, map } from 'rxjs';
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/service/Alert.service';
import { BookService } from 'src/app/shared/service/api/Book.service';
import { BookDTO } from 'src/app/shared/model/response/BookDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookDTORequest } from 'src/app/shared/model/request/BookDTORequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-book',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
})
export class ListBookComponent {
  private _dialog = inject(MatDialog);
  private _bookService = inject(BookService);
  private _alertService = inject(AlertService);

  protected subscriptios: Array<Subscription> = new Array();
  public book!: BookDTO;
  public search!: string;
  public lstBook: BookDTO[] = [];
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public lstColumsTable: string[] = [
    'TITULO',
    'ISBN',
    'ANIO_PUBLICACIÓN',
    'SELECCIONAR',
  ];
  public totalElements?: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pageSize?: number;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_BOOK
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_BOOK
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._bookService.findByKeyWord(
            this.search ? this.search : '',
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: PageDTO<BookDTO>) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          this.pageSize = data.size;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstBook = data));
  }

  public findByKeyWord(key_word: string, page: number, size: number): void {
    this.onclearLstBook();
    this.subscriptios.push(
      this._bookService
        .findByKeyWord(key_word, page, size)
        .pipe(
          map((data: PageDTO<BookDTO>) => {
            this.totalElements = data.totalElements;
            this.pageSize = data.size;
            this.paginator.pageSize = data.size;
            this.paginator.pageIndex = data.number;
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstBook = data))
    );
  }

  public onclearLstBook(): void {
    this.lstBook = [];
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }

  public onSearch(event?: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByKeyWord(
        this.search,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
    }
  }

  public onEraser(): void {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstBook();
    this.findByKeyWord(
      BibliotecaConstant.VC_EMTY,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
  }

  public onCreater(row?: BookDTO): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '95%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddBookComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.question(rpta);
      }
    });
  }

  public findById(id: number): void {
    this._bookService
      .findById(id)
      .pipe(
        map((data: BookDTO) => {
          return [data];
        })
      )
      .subscribe(
        (data: BookDTO[]) => (this.lstBook = data),
        (error: HttpErrorResponse) => {}
      );
  }

  public save(book: BookDTORequest): void {
    this._bookService.save(book).subscribe(
      (data: any) => {
        this._alertService.notification(
          BibliotecaConstant.TITLE_MODAL_SAVE,
          BibliotecaConstant.VC_SUCCESS
        );
        this.findById(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public update(id: number, book: BookDTORequest): void {
    this._bookService.update(id, book).subscribe(
      (data: any) => {
        console.log(data);
        this._alertService.notification(
          BibliotecaConstant.TITLE_MODAL_UPDATE,
          BibliotecaConstant.VC_SUCCESS
        );
        this.findById(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public question(response: any): void {
    this._alertService
      .question(
        response.action === BibliotecaConstant.ACTION_ADD
          ? BibliotecaConstant.TITLE_MODAL_QUESTION_SAVE
          : BibliotecaConstant.TITLE_MODAL_QUESTION_UPDATE,
        '¡No podrás revertir esto!',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data: boolean) => {
        if (data) {
          if (response.action === BibliotecaConstant.ACTION_ADD) {
            this.save(response.book);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.update(response.id, response.book);
          }
        }
      });
  }

  public onDelete(id: any): void {
    this._bookService.delete(id).subscribe((data: any) => {
      this.findByKeyWord(
        BibliotecaConstant.VC_EMTY,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
      this._alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public confirmationDelete(row: BookDTO): void {
    this._alertService
      .question(
        BibliotecaConstant.TITLE_MODAL_QUESTION_DELETE,
        '¡No podrás revertir esto!',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data: boolean) => {
        if (data) {
          this.onDelete(row.id);
        }
      });
  }
}
