import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddSubAreaComponent } from '../add-sub-area/add-sub-area.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-sub-area',
  templateUrl: './list-sub-area.component.html',
  styleUrls: ['./list-sub-area.component.scss'],
})
export class ListSubAreaComponent {
  private _dialog = inject(MatDialog);
  private _formBuilder = inject(FormBuilder);

  public frmArea!: FormGroup;
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public lstDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = [
    'ID',
    'DESCRIPTION',
    'AREA',
    'SELECCIONAR',
  ];
  public totalElements!: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_SUB_AREA
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_SUB_AREA
    );

    this.frmArea = this._formBuilder.group({
      id: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  public onDisabledPlus(): boolean {
    return this.frmArea.invalid;
  }
  public onSearch(e?: any): void {}
  public onEraser(): void {}
  public onCreater(): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = 1;
    const _dialogRef = this._dialog.open(AddSubAreaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {});
  }

  public isFlagDescription(): boolean {
    return this.frmArea.get('description')?.value;
  }

  public clear(): void {
    this.frmArea.reset();
  }
}
