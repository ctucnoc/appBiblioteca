import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditorialComponent } from '../add-editorial/add-editorial.component';

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
  public lstDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  public totalElements!: number;
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.lstDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.totalElements = ELEMENT_DATA.length;
  }

  public onCreater(row?: Editorial): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '40%';
    _dialogConfig.height = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(AddEditorialComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      console.log(rpta);
    });
  }
}
