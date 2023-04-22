import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditorialComponent } from '../add-editorial/add-editorial.component';
import { EditorialService } from 'src/app/shared/service/api/Editorial.service';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, merge, switchMap } from 'rxjs';
import { EditorialDTORequest } from 'src/app/shared/model/request/EditorialDTORequest';
import { HttpErrorResponse } from '@angular/common/http';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

export interface Editorial {
  id?: number;
  description?: string;
}

const ELEMENT_DATA: Editorial[] = [
  { id: 1, description: 'editorial Perú' },
  { id: 2, description: 'editorial ayacucho' },
  { id: 3, description: 'editorial unsch' },
  { id: 4, description: 'editorial la nueva esperanza' },
  { id: 5, description: 'editorial academia fullsatck' },
];

@Component({
  selector: 'app-list-editorial',
  templateUrl: './list-editorial.component.html',
  styleUrls: ['./list-editorial.component.scss'],
})
export class ListEditorialComponent {
  private _dialog = inject(MatDialog);
  private _editorialService = inject(EditorialService);

  protected subscriptios: Array<Subscription> = new Array();
  public editorial!: EditorialDTO;
  public search!: string;
  public lstEditorial: EditorialDTO[] = [];
  public title!: string;
  public lstDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  public totalElements!: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  ngOnInit(): void {
    this.title = 'Catalogo de Libros';
    //this.lstDataSource = new MatTableDataSource(ELEMENT_DATA);
    //this.totalElements = ELEMENT_DATA.length;
  }

  ngAfterViewInit(): void {
    this.findByName('', 0, 5);
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        switchMap(() => {
          return this._editorialService.findByName(
            this.search ? this.search : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        })
      )
      .subscribe((data: any) => {
        this.lstEditorial = data.content;
        this.lstDataSource = new MatTableDataSource(this.lstEditorial);
        this.totalElements = data.totalElements;
      });
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
    this.subscriptios.push(
      this._editorialService
        .findByName(name, page, size)
        .subscribe((data: any) => {
          this.lstEditorial = data.content;
          this.lstDataSource = new MatTableDataSource(this.lstEditorial);
          this.totalElements = data.totalElements;
        })
    );
  }

  public onSearch(event?: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByName(this.search, 0, 5);
    }
  }

  public onEraser(): void {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstEditorial();
    this.findByName('', 0, 5);
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
    this.subscriptios.push(
      this._editorialService.findById(id).subscribe(
        (data: any) => {
          this.editorial = data;
          this.onclearLstEditorial();
          this.lstEditorial.push(this.editorial);
          this.lstDataSource = new MatTableDataSource(this.lstEditorial);
          this.totalElements = this.lstEditorial.length;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
}
