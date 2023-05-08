import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddAuthorComponent } from '../add-author/add-author.component';
import { AuthorService } from 'src/app/shared/service/api/Author.service';
import { map, merge, startWith, switchMap } from 'rxjs';
import { AuthorDTO } from 'src/app/shared/model/response/AuthorDTO';
import { AuthorDTORequest } from 'src/app/shared/model/request/AuthorDTORequest';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AlertService } from 'src/app/shared/service/Alert.service';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ListAuthorComponent {
  private _dialog = inject(MatDialog);
  private _authorService = inject(AuthorService);
  private _alertService = inject(AlertService);

  public lstAuthor: AuthorDTO[] = [];
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'SELECCIONE'];
  public searchKey!: string;
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public pageSize: number = 5;
  public totalElements?: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_AUTHOR
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_AUTHOR
    );
  }

  ngAfterViewInit(): void {
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        startWith(() => {}),
        switchMap(() => {
          return this._authorService.findByName(
            this.searchKey ? this.searchKey : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        }),
        map((data: PageDTO<AuthorDTO>) => {
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstAuthor = data));
  }

  public findByAuthorName(name: string, page: number, size: number): void {
    this._authorService
      .findByName(name, page, size)
      .pipe(
        map((data: PageDTO<AuthorDTO>) => {
          this.totalElements = data.totalElements;
          this.matPaginator.pageIndex = data.number;
          this.matPaginator.pageSize = data.size;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstAuthor = data));
  }

  public onSearch(event: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByAuthorName(
        this.searchKey,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
    }
  }

  public onCreater(row?: AuthorDTO): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row;
    const dialogoRef = this._dialog.open(AddAuthorComponent, dialogConfig);
    dialogoRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.question(rpta);
      }
    });
  }

  public onEraser(): void {
    this.onCloseKeyWord();
    this.onCloseLstAuthor();
    this.findByAuthorName(
      BibliotecaConstant.VC_EMTY,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
  }

  public onCloseKeyWord(): void {
    this.searchKey = '';
  }
  public onCloseLstAuthor(): void {
    this.lstAuthor = [];
  }

  public save(author: AuthorDTORequest): void {
    this._authorService.save(author).subscribe(
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

  public update(id: number, author: AuthorDTORequest): void {
    this._authorService.update(id, author).subscribe(
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

  public findById(id: number): void {
    this._authorService
      .findById(id)
      .pipe(
        map((data: AuthorDTO) => {
          return [data];
        })
      )
      .subscribe(
        (data: AuthorDTO[]) => (this.lstAuthor = data),
        (error: HttpErrorResponse) => {}
      );
  }

  public loading(text: string): void {
    this._alertService.loading(text);
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
            this.save(response.author);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.update(response.id, response.author);
          }
        }
      });
  }
}
