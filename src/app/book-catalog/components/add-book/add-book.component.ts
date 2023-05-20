import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { BookDTO } from 'src/app/shared/model/response/BookDTO';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpperDirective } from 'src/app/shared/directive/input/upper.directive';
import { SearchEditorialComponent } from '../search-editorial/search-editorial.component';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { AreaDTO } from 'src/app/shared/model/response/AreaDTO';
import { SearchAreaComponent } from '../search-area/search-area.component';
import { SearchSubAreaComponent } from '../search-sub-area/search-sub-area.component';
import { AlertService } from 'src/app/shared/service/Alert.service';
import { SubAreaDTO } from 'src/app/shared/model/response/SubAreaDTO';
import { BookDTORequest } from 'src/app/shared/model/request/BookDTORequest';
import {
  validatorIsbnAsync,
  validatorNotCaractereSpecial,
} from 'src/app/shared/validators/Validator';
import { BookService } from 'src/app/shared/service/api/Book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    UpperDirective,
    SearchEditorialComponent,
    SearchAreaComponent,
    SearchSubAreaComponent,
    UpperDirective,
  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  private _dialog = inject(MatDialog);
  private _dialogRef = inject(MatDialogRef<AddBookComponent>);
  private data?: BookDTO = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private _alertService = inject(AlertService);
  private _bookService = inject(BookService);

  private action!: string;
  public frmBook!: FormGroup;

  ngOnInit(): void {
    this.frmBook = this.formBuilder.group({
      id: [this.data?.id],
      title: [
        this.data?.title,
        [Validators.required, validatorNotCaractereSpecial()],
      ],
      subTitle: [
        { value: this.data?.subtitle, disabled: false },
        [Validators.required],
      ],
      isbn: [
        { value: this.data?.isbn, disabled: this.data?.isbn },
        [Validators.required],
        validatorIsbnAsync(this._bookService),
      ],
      numberPage: [this.data?.numberPage, [Validators.required]],
      yearPublication: [this.data?.yearPublication, [Validators.required]],
      description: [this.data?.description, [Validators.required]],
      idSubArea: [this.data?.subArea?.id, [Validators.required]],
      idArea: [this.data?.subArea?.area?.id, [Validators.required]],
      idEditorial: [this.data?.editorial?.id, [Validators.required]],
      descripcionEditorial: [this.data?.editorial?.name, [Validators.required]],
      descriptionSubArea: [
        this.data?.subArea?.description,
        [Validators.required],
      ],
      descriptionArea: [
        this.data?.subArea?.area?.description,
        [Validators.required],
      ],
    });
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this.action = this.frmBook.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      book: this.frmBook.value,
      action: this.action,
      id: this.frmBook.value.id,
    });
  }

  public onSubmit(): void {
    this.action = this.frmBook.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmBook.value.id,
      book: this.convertToDto(this.frmBook.value),
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmBook.invalid;
  }

  public onSearchComponent(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(
      SearchEditorialComponent,
      _dialogConfig
    );

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.onSetEditorial(rpta.editorial);
      }
    });
  }

  public onSearchComponentArea(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this._dialog.open(SearchAreaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.onSetArea(rpta.area);
      }
    });
  }

  public onSearchComponentSubArea(): void {
    if (this.frmBook.get('idArea')?.valid) {
      const _dialogConfig = new MatDialogConfig();
      _dialogConfig.disableClose = true;
      _dialogConfig.autoFocus = true;
      _dialogConfig.width = '50%';
      _dialogConfig.data = this.frmBook.get('idArea')?.value;
      const _dialogRef = this._dialog.open(
        SearchSubAreaComponent,
        _dialogConfig
      );

      _dialogRef.afterClosed().subscribe((rpta) => {
        if (rpta) {
          this.onSetSubArea(rpta.subArea);
        }
      });
    } else {
      this._alertService.notification(
        BibliotecaConstant.TITLE_MODAL_ERROR_AREA,
        BibliotecaConstant.VC_WARN
      );
    }
  }

  public onSetEditorial(editorial: EditorialDTO): void {
    this.frmBook.controls['idEditorial'].setValue(editorial.id);
    this.frmBook.controls['descripcionEditorial'].setValue(editorial.name);
  }

  public onSetArea(area: AreaDTO): void {
    this.frmBook.controls['idArea'].setValue(area.id);
    this.frmBook.controls['descriptionArea'].setValue(area.description);
  }

  public onSetSubArea(subarea: SubAreaDTO): void {
    this.frmBook.controls['idSubArea'].setValue(subarea.id);
    this.frmBook.controls['descriptionSubArea'].setValue(subarea.description);
  }

  public convertToDto(data: any): BookDTORequest {
    const book: BookDTORequest = {
      title: data.title,
      subTitle: data.subTitle,
      isbn: data.isbn,
      description: data.description,
      numberPage: data.numberPage,
      yearPublication: data.yearPublication,
      idEditorial: data.idEditorial,
      idSubArea: data.idSubArea,
    };
    return book;
  }
}
