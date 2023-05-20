import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditorialComponent } from '../add-editorial/add-editorial.component';
import { EditorialService } from 'src/app/shared/service/api/Editorial.service';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { EditorialDTORequest } from 'src/app/shared/model/request/EditorialDTORequest';
import { HttpErrorResponse } from '@angular/common/http';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';
import { AlertService } from 'src/app/shared/service/Alert.service';

@Component({
  selector: 'app-list-editorial',
  templateUrl: './list-editorial.component.html',
  styleUrls: ['./list-editorial.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ListEditorialComponent {
  private _dialog = inject(MatDialog);
  private _editorialService = inject(EditorialService);
  private _alertService = inject(AlertService);

  protected subscriptios: Array<Subscription> = new Array();
  public editorial!: EditorialDTO;
  public search!: string;
  public lstEditorial: EditorialDTO[] = [];
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  public totalElements?: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isLoadingResults: boolean = true;
  public pageSize?: number;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_AREA
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_AREA
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._editorialService.findByName(
            this.search ? this.search : '',
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data) => {
          if (data === null) {
            return [];
          }
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;
          this.pageSize = data.size;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstEditorial = data));
  }

  ngOnDestroy(): void {
    this.subscriptios.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: EditorialDTO): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddEditorialComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.editorial);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.editorial);
      }
    });
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstEditorial();
    this.isLoadingResults = true;
    this.subscriptios.push(
      this._editorialService
        .findByName(name, page, size)
        .pipe(
          map((data: PageDTO<EditorialDTO>) => {
            this.isLoadingResults = false;
            this.totalElements = data.totalElements;
            this.pageSize = data.size;
            this.paginator.pageSize = data.size;
            this.paginator.pageIndex = data.number;
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstEditorial = data))
    );
  }

  public onSearch(event?: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByName(
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
    this.findByName(
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
    this.lstEditorial = [];
  }

  public save(editorial: EditorialDTORequest): void {
    this.subscriptios.push(
      this._editorialService.save(editorial).subscribe(
        (data: any) => {
          console.log(data);
          this.findById(data.id);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }

  public update(id: number, editorial: EditorialDTORequest): void {
    this.subscriptios.push(
      this._editorialService.upate(id, editorial).subscribe(
        (data: any) => {
          console.log(data);
          this.findById(data.id);
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
      this._editorialService
        .findById(id)
        .pipe(
          map((data) => {
            let lstEditorial: EditorialDTO[] = [];
            lstEditorial.push(data);
            this.totalElements = lstEditorial.length;
            return lstEditorial;
          })
        )
        .subscribe(
          (data: any) => (this.lstEditorial = data),
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    );
  }

  public onDelete(id: any): void {
    this._editorialService.delete(id).subscribe((data: any) => {
      this.findByName(
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

  public confirmationDelete(row: EditorialDTO): void {
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
