import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { AreaDTO } from './../../../shared/model/response/AreaDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AreaDTORequest } from 'src/app/shared/model/request/AreaDTORequest';
import { AreaService } from 'src/app/shared/service/api/Area.service';
import { AddAreaComponent } from '../add-area/add-area.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { successNotification } from 'src/app/shared/config/LibraryConfig';
import { AlertService } from 'src/app/shared/service/Alert.service';

@Component({
  selector: 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls: ['./list-area.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ListAreaComponent {
  private _dialog = inject(MatDialog);
  private _areaService = inject(AreaService);
  private _snackBar = inject(MatSnackBar);
  private _alertService = inject(AlertService);

  protected subscriptios: Array<Subscription> = new Array();

  public area!: AreaDTO;
  public lstArea: AreaDTO[] = [];
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public search!: string;
  public totalElements?: number;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

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
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading('Cargando...');
          return this._areaService.findByDescription(
            this.search ? this.search : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        }),
        map((data: PageDTO<AreaDTO>) => {
          this.totalElements = data.totalElements;
          this._alertService.close();
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstArea = data));
  }

  ngOnDestroy(): void {
    this.subscriptios.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: AreaDTO): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddAreaComponent, _dialogConfig);

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
      this._areaService
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
        .subscribe((data: any) => (this.lstArea = data))
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
    this.lstArea = [];
  }

  public save(area: AreaDTORequest): void {
    this.subscriptios.push(
      this._areaService.save(area).subscribe(
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

  public update(id: number, area: AreaDTORequest): void {
    this.subscriptios.push(
      this._areaService.upate(id, area).subscribe(
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
      this._areaService
        .findById(id)
        .pipe(
          map((data: AreaDTO) => {
            let lstArea: AreaDTO[] = [];
            lstArea.push(data);
            this.totalElements = lstArea.length;
            return lstArea;
          })
        )
        .subscribe(
          (data: any) => (this.lstArea = data),
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    );
  }

  public success(msg: string) {
    successNotification(msg, this._snackBar);
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
            this.save(response.area);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.update(response.id, response.area);
          }
        }
      });
  }
}
