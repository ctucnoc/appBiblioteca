import { UpperDirective } from 'src/app/shared/directive/input/upper.directive';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddAreaComponent } from 'src/app/book-catalog/components/add-area/add-area.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LibraryDTO } from 'src/app/shared/model/response/LibraryDTO';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-library',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    UpperDirective,
  ],
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.scss'],
})
export class AddLibraryComponent {
  private _dialogRef = inject(MatDialogRef<AddAreaComponent>);
  private data: LibraryDTO = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  private action!: string;
  public frmLibrary!: FormGroup;

  ngOnInit(): void {
    this.frmLibrary = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      description: [this.data?.description, [Validators.required]],
      address: [this.data?.address],
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }

  public onSubmit(): void {
    this.action = this.frmLibrary.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmLibrary.value.id,
      library: this.frmLibrary.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmLibrary.invalid;
  }
}
