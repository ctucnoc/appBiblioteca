import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sub-area',
  templateUrl: './add-sub-area.component.html',
  styleUrls: ['./add-sub-area.component.scss'],
})
export class AddSubAreaComponent {
  private _dialogRef = inject(MatDialogRef<AddSubAreaComponent>);
  private idArea = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  public frmSubArea!: FormGroup;

  ngOnInit(): void {
    this.frmSubArea = this.formBuilder.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      idArea: [this.idArea, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.frmSubArea.value.maxLength;
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }

  public onSubmit(): void {
    this._dialogRef.close(false);
  }

  public onDisabled(): boolean {
    return this.frmSubArea.invalid;
  }
}