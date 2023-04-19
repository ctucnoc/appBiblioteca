import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAuthorComponent } from '../add-author/add-author.component';

export interface Author {
  id?: number;
  name?: string;
  lastName?: string;
}

const ELEMENT_DATA: Author[] = [
  { id: 1, name: 'Cristian', lastName: 'Tucno Conde' },
  { id: 2, name: 'Abel', lastName: 'Gamboa' },
  { id: 3, name: 'Juan', lastName: 'Perez' },
  { id: 4, name: 'Pablito', lastName: 'Conde Lagarto' },
  { id: 5, name: 'Gallito', lastName: 'Vilca dipa' },
];

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss'],
})
export class ListAuthorComponent {
  public lstMatDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'SELECCIONE'];
  public searchKey!: string;
  public title!: string;
  public pageSize: number = 5;
  public totalElements!: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.title = 'Catalogo de Libros';
    this.findByAuthor();
  }

  public findByAuthor(): void {
    this.lstMatDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.lstMatDataSource.sort = this.matSort;
    this.lstMatDataSource.paginator = this.matPaginator;
    this.totalElements = ELEMENT_DATA.length;
  }

  public onCreater(row?: Author): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row;
    const dialogoRef = this._dialog.open(AddAuthorComponent, dialogConfig);
    dialogoRef.afterClosed().subscribe((rpta) => {
      console.log(rpta);
    });
  }
}
