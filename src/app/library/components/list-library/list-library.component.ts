import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LibraryService } from 'src/app/shared/service/api/Library.service';
import { AlertService } from 'src/app/shared/service/Alert.service';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { LibraryDTO } from 'src/app/shared/model/response/LibraryDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';
import { AddLibraryComponent } from '../add-library/add-library.component';
import { LibraryDTORequest } from 'src/app/shared/model/request/LibraryDTORequest';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-library',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './list-library.component.html',
  styleUrls: ['./list-library.component.scss'],
})
export class ListLibraryComponent {
  private _dialog = inject(MatDialog);
  private _libraryService = inject(LibraryService);
  private _alertService = inject(AlertService);

  protected subscriptios: Array<Subscription> = new Array();

  public library!: LibraryDTO;
  public lstLibrary: LibraryDTO[] = [];
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public search!: string;
  public totalElements?: number;
  public lstColumsTable: string[] = [
    'NOMBRE',
    'DESCRIPTION',
    'DIRECCION',
    'SELECCIONAR',
  ];
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_LIBRARY;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_LIBRARY
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_LIBRARY
    );
  }
  ngAfterViewInit(): void {
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading('Cargando...');
          return this._libraryService.findByDescription(
            this.search ? this.search : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        }),
        map((data: PageDTO<LibraryDTO>) => {
          this.totalElements = data.totalElements;
          this._alertService.close();
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstLibrary = data));
  }

  ngOnDestroy(): void {
    this.subscriptios.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: LibraryDTO): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddLibraryComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.question(rpta);
      }
    });
  }

  public findByDescription(
    description: string,
    page: number,
    size: number
  ): void {
    this.loading('Cargando...');
    this.subscriptios.push(
      this._libraryService
        .findByDescription(description, page, size)
        .pipe(
          map((data) => {
            this.totalElements = data.totalElements;
            this.matPaginator.pageIndex = data.number;
            this.matPaginator.pageSize = data.size;
            this._alertService.close();
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstLibrary = data))
    );
  }

  public onSearch(event?: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByDescription(
        this.search,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
    }
  }

  public onEraser(): void {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstEditorial();
    this.findByDescription(
      BibliotecaConstant.VC_EMTY,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstEditorial(): void {
    this.lstLibrary = [];
  }

  public save(library: LibraryDTORequest): void {
    this.subscriptios.push(
      this._libraryService.save(library).subscribe(
        (data: any) => {
          this.findById(data.id);
          this._alertService.notification(
            BibliotecaConstant.TITLE_MODAL_SAVE,
            BibliotecaConstant.VC_SUCCESS
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }

  public update(id: number, library: LibraryDTORequest): void {
    this.subscriptios.push(
      this._libraryService.upate(id, library).subscribe(
        (data: any) => {
          this.findById(data.id);
          this._alertService.notification(
            BibliotecaConstant.TITLE_MODAL_UPDATE,
            BibliotecaConstant.VC_SUCCESS
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }

  public findById(id: number): void {
    this.onclearLstEditorial();
    this.subscriptios.push(
      this._libraryService
        .findById(id)
        .pipe(
          map((data: LibraryDTO) => {
            let lstLibrary: LibraryDTO[] = [];
            lstLibrary.push(data);
            this.totalElements = lstLibrary.length;
            return lstLibrary;
          })
        )
        .subscribe(
          (data: any) => (this.lstLibrary = data),
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
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
            this.save(response.library);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.update(response.id, response.library);
          }
        }
      });
  }

  public onDelete(id: any): void {
    this._libraryService.delete(id).subscribe((data: any) => {
      this.findByDescription(
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

  public confirmationDelete(row: LibraryDTO): void {
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
