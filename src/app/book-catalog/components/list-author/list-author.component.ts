import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAuthorComponent } from '../add-author/add-author.component';
import { AuthorService } from 'src/app/shared/service/api/Author.service';
import { merge, switchMap } from 'rxjs';

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
  private _dialog = inject(MatDialog);
  private _authorService = inject(AuthorService);

  public lstAuthor: Author[] = [];
  public lstMatDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'SELECCIONE'];
  public searchKey!: string;
  public title!: string;
  public pageSize: number = 5;
  public totalElements!: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  ngOnInit(): void {
    this.title = 'Catalogo de Libros';
  }

  ngAfterViewInit(): void {
    this.findByAuthorName('', 0, 5);
    this.matSort.sortChange.subscribe(() => (this.matPaginator.pageIndex = 0));
    merge(this.matSort.sortChange, this.matPaginator.page)
      .pipe(
        switchMap(() => {
          return this._authorService.findByName(
            this.searchKey ? this.searchKey : '',
            this.matPaginator.pageIndex,
            this.matPaginator.pageSize
          );
        })
      )
      .subscribe((data: any) => {
        this.lstAuthor = data.content;
        this.lstMatDataSource = new MatTableDataSource(this.lstAuthor);
        this.totalElements = data.totalElements;
      });
  }

  public findByAuthorName(name: string, page: number, size: number): void {
    this._authorService.findByName(name, page, size).subscribe((data: any) => {
      this.lstAuthor = data.content;
      this.lstMatDataSource = new MatTableDataSource(this.lstAuthor);
      this.totalElements = data.totalElements;
    });
  }

  public onSearch(event: any): void {
    if (event.key === 'Enter' || event.keyCode === 'Enter') {
      this.findByAuthorName(this.searchKey, 0, 5);
    }
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

  public onEraser(): void {
    this.onCloseKeyWord();
    this.onCloseLstAuthor();
    this.findByAuthorName('', 0, 5);
  }

  public onCloseKeyWord(): void {
    this.searchKey = '';
  }
  public onCloseLstAuthor(): void {
    this.lstAuthor = [];
  }
}
