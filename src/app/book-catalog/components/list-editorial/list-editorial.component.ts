import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION'];
  public totalElements!: number;
  constructor() {}

  ngOnInit(): void {
    this.lstDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.totalElements = ELEMENT_DATA.length;
  }
}
