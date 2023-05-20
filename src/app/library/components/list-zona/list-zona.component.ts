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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddZonaComponent } from '../add-zona/add-zona.component';
import { ZoneDTORequest } from 'src/app/shared/model/request/ZoneDTORequest';

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
  private _dialog = inject(MatDialog);
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

  public onCreater(zone?: ZoneDTO): void {
    let subAreaId: ZoneLibraryJoin = {
      ZoneDTO: zone,
      idLibrary: this.frmLibrary.get('id')?.value,
    };
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = subAreaId;
    const _dialogRef = this._dialog.open(AddZonaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        console.log(rpta);
        this.question(rpta);
      }
    });
  }

  public question(response: any): void {
    this._alertService
      .question(
        response.action === BibliotecaConstant.ACTION_ADD
          ? BibliotecaConstant.TITLE_MODAL_QUESTION_SAVE
          : BibliotecaConstant.TITLE_MODAL_QUESTION_UPDATE,
        '¡No podrás revertir esto!',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data: boolean) => {
        if (data) {
          if (response.action === BibliotecaConstant.ACTION_ADD) {
            this.onSave(response.zone);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.onUpdate(response.id, response.zone);
          }
        }
      });
  }

  public onDisabledPlus(): boolean {
    return this.frmLibrary.invalid;
  }

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

  public onSave(zone: ZoneDTORequest): void {
    this._zoneService.save(zone).subscribe(
      (data: any) => {
        const idlibrary: any = zone.idLibrary;
        this.findByLibrary(
          idlibrary,
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
        this._alertService.notification(
          BibliotecaConstant.TITLE_MODAL_SAVE,
          BibliotecaConstant.VC_SUCCESS
        );
      },
      (error: HttpErrorResponse) => {
        if (error.status === 422) {
          this._alertService.notification(
            'Zona ya se encuentra registrado',
            BibliotecaConstant.VC_ERROR
          );
        }
      }
    );
  }

  public onUpdate(id: number, zone: ZoneDTORequest): void {
    this._zoneService.upate(id, zone).subscribe(
      (data: any) => {
        const idLibrary: any = zone.idLibrary;
        this.findByLibrary(
          idLibrary,
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
        this._alertService.notification(
          BibliotecaConstant.TITLE_MODAL_UPDATE,
          BibliotecaConstant.VC_SUCCESS
        );
      },
      (error: HttpErrorResponse) => {}
    );
  }

  public onDelete(id: any, idLibrary: any): void {
    this._zoneService.delete(id).subscribe((data: any) => {
      this.findByLibrary(
        idLibrary,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
      this._alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public confirmationDelete(row: ZoneDTO): void {
    this._alertService
      .question(
        BibliotecaConstant.TITLE_MODAL_QUESTION_DELETE,
        '¡No podrás revertir esto!',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data: boolean) => {
        if (data) {
          this.onDelete(row.id, this.frmLibrary.get('id')?.value);
        }
      });
  }

  public clear(): void {
    this.frmLibrary.reset();
  }

  public onEraser(): void {
    this.filterLibrary$.pipe(
      map((data: LibraryDTO[]) => {
        return [];
      })
    );
    this.lstZone = [];
    this.clear();
  }
}
