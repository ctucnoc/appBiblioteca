import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from 'src/app/shared/service/api/Area.service';
import { AreaDTO } from 'src/app/shared/model/response/AreaDTO';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss'],
})
export class SearchAreaComponent {
  private _dialogRef = inject(MatDialogRef<SearchAreaComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private _areaService = inject(AreaService);

  public area!: AreaDTO;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstArea: AreaDTO[] = [];
  private action!: string;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._areaService.findByDescription(
            this.search ? this.search : '',
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: PageDTO<AreaDTO>) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstArea = data));
  }

  public onclearLstEditorial(): void {
    this.lstArea = [];
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstEditorial();
    this.subscriptios.push(
      this._areaService
        .findByDescription(name, page, size)
        .pipe(
          map((data: PageDTO<AreaDTO>) => {
            this.totalElements = data.totalElements;
            this.paginator.pageSize = data.size;
            this.paginator.pageIndex = data.number;
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstArea = data))
    );
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ area: this.area });
  }

  public selectRow(row: AreaDTO): void {
    this.blDisabled = false;
    this.area = row;
  }
}
