import { merge, startWith, switchMap, map, Subscription } from 'rxjs';
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorialService } from 'src/app/shared/service/api/Editorial.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { PageDTO } from 'src/app/shared/model/response/PageDTO';

@Component({
  selector: 'app-search-editorial',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './search-editorial.component.html',
  styleUrls: ['./search-editorial.component.scss'],
})
export class SearchEditorialComponent {
  private _dialogRef = inject(MatDialogRef<SearchEditorialComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private _editorialService = inject(EditorialService);

  public editorial!: EditorialDTO;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstEditorial: EditorialDTO[] = [];
  private action!: string;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._editorialService.findByName(
            this.search ? this.search : '',
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data) => {
          if (data === null) {
            return [];
          }
          this.totalElements = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: any) => (this.lstEditorial = data));
  }

  public onclearLstEditorial(): void {
    this.lstEditorial = [];
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstEditorial();
    this.subscriptios.push(
      this._editorialService
        .findByName(name, page, size)
        .pipe(
          map((data: PageDTO<EditorialDTO>) => {
            this.totalElements = data.totalElements;
            this.paginator.pageSize = data.size;
            this.paginator.pageIndex = data.number;
            return data.content;
          })
        )
        .subscribe((data: any) => (this.lstEditorial = data))
    );
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ editorial: this.editorial });
  }

  public selectRow(row: EditorialDTO): void {
    this.blDisabled = false;
    this.editorial = row;
  }
}
