import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface user {
  identifier?: string;
  fullName?: string;
  email?: string;
  state?: string;
}

const ELEMENT_DATA: user[] = [
  {
    identifier: 'pbautistac',
    fullName: 'pablito bautista',
    email: 'pablito@gmail.com',
    state: 'activo',
  },
  {
    identifier: 'avilcad',
    fullName: 'abelardo vilca',
    email: 'avilca@gmail.com',
    state: 'activo',
  },
  {
    identifier: 'ctucnoc',
    fullName: 'cristian tucno',
    email: 'ctucnoc@gmail.com',
    state: 'activo',
  },
  {
    identifier: 'eramirezm',
    fullName: 'erder ramirez',
    email: 'eramirez@gmail.com',
    state: 'activo',
  },
  {
    identifier: 'agamboam',
    fullName: 'abelito gamboa',
    email: 'agamboam@gmail.com',
    state: 'activo',
  },
  {
    identifier: 'jcarbajals',
    fullName: 'jhoni carbajal',
    email: 'jcarbajals@gmail.com',
    state: 'activo',
  },
];

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  public lstMatDataSource!: MatTableDataSource<any>;
  public lstColumsTable: string[] = [
    'USUARIO',
    'NOMBRE COMPLETO',
    'EMAIL',
    'ESTADO',
  ];

  public searchKey!: string;
  public title!: string;
  public pageSize: number = 5;
  public totalElements!: number;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  constructor() {}

  ngOnInit(): void {
    this.title = 'Seguridad';
    this.findByUser();
  }

  public findByUser(): void {
    this.lstMatDataSource = new MatTableDataSource(ELEMENT_DATA);
    this.lstMatDataSource.sort = this.matSort;
    this.lstMatDataSource.paginator = this.matPaginator;
    this.totalElements = ELEMENT_DATA.length;
  }
}
