import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AreaDTO } from 'src/app/shared/model/response/AreaDTO';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AddAreaComponent {
  private _dialogRef = inject(MatDialogRef<AddAreaComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  private action!: string;
  public frmArea!: FormGroup;

  ngOnInit(): void {
    this.frmArea = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required]],
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
    this.action = this.frmArea.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmArea.value.id,
      editorial: this.frmArea.value,
      action: this.action,
    });
  }

  public onEdit(row: AreaDTO): void {
    this.frmArea.setValue({
      id: row.id,
      description: row.description,
    });
  }

  public onDisabled(): boolean {
    return this.frmArea.invalid;
  }
}
