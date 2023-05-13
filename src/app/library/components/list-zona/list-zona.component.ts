import { ZoneDTO } from './../../../shared/model/response/ZoneDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryService } from 'src/app/shared/service/api/Library.service';
import {
  Observable,
  Subscription,
  map,
  merge,
  startWith,
  switchMap,
  of,
} from 'rxjs';
import { LibraryDTO } from 'src/app/shared/model/response/LibraryDTO';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AlertService } from 'src/app/shared/service/Alert.service';
import { ZoneService } from 'src/app/shared/service/api/Zone.service';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';

export interface ZoneLibraryJoin {
  idLibrary?: number;
  ZoneDTO?: ZoneDTO;
}

const pageDto: PageDTO<ZoneDTO> = {
  content: [],
  pageable: {},
  totalElements: 0,
  totalPages: 0,
  last: false,
  size: 0,
  number: 0,
};

@Component({
  selector: 'app-list-zona',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
  templateUrl: './list-zona.component.html',
  styleUrls: ['./list-zona.component.scss'],
})
export class ListZonaComponent {
  private _LibraryService = inject(LibraryService);
  private _zoneService = inject(ZoneService);
  private _formBuilder = inject(FormBuilder);
  private _alertService = inject(AlertService);

  public lstZone: ZoneDTO[] = [];
  public totalElements?: number = 0;
  public filterLibrary$!: Observable<LibraryDTO[]>;
  private subscriptios: Array<Subscription> = new Array();
  public libraries: LibraryDTO[] = [];
  public frmLibrary!: FormGroup;
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_PAGE_LIBRARY;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_ZONE
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_ZONE
    );

    this.frmLibrary = this._formBuilder.group({
      id: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          let emptyPage$ = of(pageDto);
          if (this.frmLibrary.valid) {
            emptyPage$ = this._zoneService.findLibrary(
              this.frmLibrary.get('id')?.value,
              this.paginator.pageIndex,
              this.paginator.pageSize
            );
          }
          return emptyPage$;
        }),
        map((data: PageDTO<ZoneDTO>) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstZone = data));
  }

  public findByKeyWordFilter(key_word: string): void {
    this.filterLibrary$ = this._LibraryService.findBykeyWordFilter(key_word);
  }

  public onCreater(row?: LibraryDTO): void {}

  public onDisabledPlus(): boolean {
    return this.frmLibrary.invalid;
  }
  public onEraser(): void {}

  public onSearch(e?: any): void {
    if (this.isFlagDescription()) {
      this.findByKeyWordFilter(e.target.value);
    }
  }

  public isFlagDescription(): boolean {
    return this.frmLibrary.get('description')?.value;
  }
  public onSelect(library: LibraryDTO): void {
    const id: any = library.id;
    this.setfrmLibrary(library);
    this.findByLibrary(
      id,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
  }

  public confirmationDelete(row: LibraryDTO): void {}

  public setfrmLibrary(library: LibraryDTO): void {
    this.frmLibrary.setValue({
      id: library.id,
      description: library.description,
    });
  }

  public findByLibrary(idLibrary: number, page: number, size: number): void {
    this._zoneService
      .findLibrary(idLibrary, page, size)
      .pipe(
        map((data: PageDTO<ZoneDTO>) => {
          this.totalElements = data.totalElements;
          this.paginator.pageIndex = data.number;
          this.paginator.pageSize = data.size;
          return data.content;
        })
      )
      .subscribe(
        (data: any) => {
          this.lstZone = data;
        },
        (error: HttpErrorResponse) => {}
      );
  }
}
