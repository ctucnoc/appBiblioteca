import { Subscription, merge, switchMap } from 'rxjs';
import { AreaDTO } from './../../../shared/model/response/AreaDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AreaDTORequest } from 'src/app/shared/model/request/AreaDTORequest';
import { AreaService } from 'src/app/shared/service/api/Area.service';
import { AddAreaComponent } from '../add-area/add-area.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls: ['./list-area.component.scss'],
})
export class ListAreaComponent {
  private _dialog = inject(MatDialog);
  private _areaService = inject(AreaService);

  protected subscriptios: Array<Subscription> = new Array();

  public area!: AreaDTO;
  public lstArea: AreaDTO[] = [];
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public search!: string;
  public totalElements!: number;
  public lstDataSource!: MatTableDataSource<any>;
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
    this.findByDescription(
      BibliotecaConstant.VC_EMTY,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        switchMap(() => {
          return this._areaService.findByDescription(
            this.search ? this.search : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        })
      )
      .subscribe((data: any) => {
        this.lstArea = data.content;
        this.lstDataSource = new MatTableDataSource(this.lstArea);
        this.totalElements = data.totalElements;
      });
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
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.editorial);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.editorial);
      }
    });
  }

  public findByDescription(
    description: string,
    page: number,
    size: number
  ): void {
    this.subscriptios.push(
      this._areaService
        .findByDescription(description, page, size)
        .subscribe((data: any) => {
          this.lstArea = data.content;
          this.lstDataSource = new MatTableDataSource(this.lstArea);
          this.totalElements = data.totalElements;
        })
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
          console.log(data);
          this.findById(data.id);
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
    this.subscriptios.push(
      this._areaService.findById(id).subscribe(
        (data: any) => {
          this.area = data;
          this.onclearLstEditorial();
          this.lstArea.push(this.area);
          this.lstDataSource = new MatTableDataSource(this.lstArea);
          this.totalElements = this.lstArea.length;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
}
