import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-add-editorial',
  templateUrl: './add-editorial.component.html',
  styleUrls: ['./add-editorial.component.scss'],
})
export class AddEditorialComponent {
  private _dialogRef = inject(MatDialogRef<AddEditorialComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  private action!: string;
  public frmEditorial!: FormGroup;

  ngOnInit(): void {
    this.frmEditorial = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.onEdit(this.data);
    }
    this.cdRef.detectChanges();
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }

  public onSubmit(): void {
    this.action = this.frmEditorial.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmEditorial.value.id,
      editorial: this.frmEditorial.value,
      action: this.action,
    });
  }

  public onEdit(row: EditorialDTO): void {
    this.frmEditorial.setValue({
      id: row.id,
      name: row.name,
    });
  }

  public onDisabled(): boolean {
    return this.frmEditorial.invalid;
  }
}
