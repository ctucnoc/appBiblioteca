import { SubAreaDTO } from './../../../shared/model/response/SubAreaDTO';
import { PageDTO } from './../../../shared/model/response/PageDTO';
import { UpperDirective } from './../../../shared/directive/input/upper.directive';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddSubAreaComponent } from '../add-sub-area/add-sub-area.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AreaDTO } from 'src/app/shared/model/response/AreaDTO';
import { AreaService } from 'src/app/shared/service/api/Area.service';
import { map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import { SubAreaService } from 'src/app/shared/service/api/SubArea.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubAreaDTORequest } from 'src/app/shared/model/request/SubAreaDTORequest';
import { AlertService } from 'src/app/shared/service/Alert.service';

export interface SubAreaJoin {
  idArea?: number;
  subArea?: SubAreaDTO;
}

const pageDto: PageDTO<SubAreaDTO> = {
  content: [],
  pageable: {},
  totalElements: 0,
  totalPages: 0,
  last: false,
  size: 0,
  number: 0,
};

@Component({
  selector: 'app-list-sub-area',
  templateUrl: './list-sub-area.component.html',
  styleUrls: ['./list-sub-area.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    UpperDirective,
  ],
})
export class ListSubAreaComponent {
  private _dialog = inject(MatDialog);
  private _formBuilder = inject(FormBuilder);
  private _areaService = inject(AreaService);
  private _subAreaService = inject(SubAreaService);
  private _alertService = inject(AlertService);

  public totalElements?: number = 0;
  public lstSubArea: SubAreaDTO[] = [];
  public filterAreas$!: Observable<AreaDTO[]>;
  public areas: AreaDTO[] = [];
  public frmArea!: FormGroup;
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  public lstColumsTable: string[] = ['ID', 'DESCRIPTION', 'SELECCIONAR'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
          if (this.frmArea.valid) {
            emptyPage$ = this._subAreaService.findByArea(
              this.frmArea.get('id')?.value,
              this.paginator.pageIndex,
              this.paginator.pageSize
            );
          }
          return emptyPage$;
        }),
        map((data: PageDTO<SubAreaDTO>) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstSubArea = data));
  }

  public onDisabledPlus(): boolean {
    return this.frmArea.invalid;
  }
  public onSearch(e?: any): void {
    if (this.isFlagDescriptionInvalid()) {
      this.onFilterArea(e.target.value);
    }
  }
  public onEraser(): void {
    this.filterAreas$.pipe(
      map((data: SubAreaDTO[]) => {
        return [];
      })
    );
    this.lstSubArea = [];
    this.frmArea.reset();
  }

  public onCreater(subArea?: SubAreaDTO): void {
    let subAreaId: SubAreaJoin = {
      subArea: subArea,
      idArea: this.frmArea.get('id')?.value,
    };
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = subAreaId;
    const _dialogRef = this._dialog.open(AddSubAreaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        console.log(rpta);
        this.question(rpta);
      }
    });
  }

  public isFlagDescription(): boolean {
    return this.frmArea.get('description')?.value;
  }

  public isFlagDescriptionInvalid(): boolean | undefined {
    return this.frmArea.get('description')?.valid;
  }

  public setfrmArea(area: AreaDTO): void {
    this.frmArea.setValue({
      id: area.id,
      description: area.description,
    });
  }

  public clear(): void {
    this.frmArea.reset();
  }

  public onFilterArea(description: string): void {
    this.filterAreas$ = this._areaService.findByDescriptionFilter(description);
  }

  public onSelect(area: AreaDTO): void {
    const id: any = area.id;
    this.setfrmArea(area);
    this.findByArea(
      id,
      BibliotecaConstant.PAGE_NRO_INITIAL,
      BibliotecaConstant.PAGE_SIZE_INITIAL
    );
  }

  public findByArea(idarea: number, page: number, size: number): void {
    this._subAreaService
      .findByArea(idarea, page, size)
      .pipe(
        map((data: PageDTO<SubAreaDTO>) => {
          this.totalElements = data.totalElements;
          this.paginator.pageIndex = data.number;
          this.paginator.pageSize = data.size;
          return data.content;
        })
      )
      .subscribe(
        (data: any) => {
          this.lstSubArea = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public onSave(subArea: SubAreaDTORequest): void {
    this._subAreaService.save(subArea).subscribe(
      (data: any) => {
        const idArea: any = subArea.idArea;
        this.findByArea(
          idArea,
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
            'Sub Area ya se encuentra registrado',
            BibliotecaConstant.VC_ERROR
          );
        }
      }
    );
  }

  public onUpdate(id: number, subArea: SubAreaDTORequest): void {
    this._subAreaService.upate(id, subArea).subscribe(
      (data: any) => {
        const idArea: any = subArea.idArea;
        this.findByArea(
          idArea,
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
            this.onSave(response.subArea);
          } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
            this.onUpdate(response.id, response.subArea);
          }
        }
      });
  }

  public onDelete(id: any, idArea: any): void {
    this._subAreaService.delete(id).subscribe((data: any) => {
      this.findByArea(
        idArea,
        BibliotecaConstant.PAGE_NRO_INITIAL,
        BibliotecaConstant.PAGE_SIZE_INITIAL
      );
      this._alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public confirmationDelete(row: SubAreaDTO): void {
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
          this.onDelete(row.id, this.frmArea.get('id')?.value);
        }
      });
  }
}
