import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubAreaService } from 'src/app/shared/service/api/SubArea.service';
import { SubAreaDTO } from 'src/app/shared/model/response/SubAreaDTO';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';

@Component({
  selector: 'app-search-sub-area',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './search-sub-area.component.html',
  styleUrls: ['./search-sub-area.component.scss'],
})
export class SearchSubAreaComponent {
  private _dialogRef = inject(MatDialogRef<SearchSubAreaComponent>);
  private data: number = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private _subAreaService = inject(SubAreaService);

  public subArea!: SubAreaDTO;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstSubarea: SubAreaDTO[] = [];
  private action!: string;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._subAreaService.findByArea(
            this.data,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: PageDTO<SubAreaDTO>) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstSubarea = data));
  }

  public onclearLstEditorial(): void {
    this.lstSubarea = [];
  }

  public findByName(idArea: number, page: number, size: number): void {
    this.onclearLstEditorial();
    this.subscriptios.push(
      this._subAreaService
        .findByArea(idArea, page, size)
        .pipe(
          map((data: PageDTO<SubAreaDTO>) => {
            this.totalElements = data.totalElements;
            this.paginator.pageSize = data.size;
            this.paginator.pageIndex = data.number;
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstSubarea = data))
    );
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ subArea: this.subArea });
  }

  public selectRow(row: any): void {
    this.blDisabled = false;
    const subAreas = row.options;
    this.subArea = subAreas[0].value;
  }
}
