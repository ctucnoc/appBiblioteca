import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditorialComponent } from '../add-editorial/add-editorial.component';
import { EditorialService } from 'src/app/shared/service/api/Editorial.service';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { merge, switchMap } from 'rxjs';

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

  public onCreater(row?: EditorialDTO): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddEditorialComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      console.log(rpta);
    });
  }

  public findByName(name: string, page: number, size: number): void {
    this._editorialService
      .findByName(name, page, size)
      .subscribe((data: any) => {
        this.lstEditorial = data.content;
        this.lstDataSource = new MatTableDataSource(this.lstEditorial);
        this.totalElements = data.totalElements;
      });
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
}
