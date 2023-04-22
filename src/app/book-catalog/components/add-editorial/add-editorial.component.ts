import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialDTO } from 'src/app/shared/model/response/EditorialDTO';

@Component({
  selector: 'app-add-editorial',
  templateUrl: './add-editorial.component.html',
  styleUrls: ['./add-editorial.component.scss'],
})
export class AddEditorialComponent {
  public frmEditorial!: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<AddEditorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditorialDTO,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

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
    this._dialogRef.close(this.frmEditorial.value);
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
