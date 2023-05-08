import { UpperDirective } from './../../../shared/directive/input/upper.directive';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { SubAreaJoin } from '../list-sub-area/list-sub-area.component';

@Component({
  selector: 'app-add-sub-area',
  templateUrl: './add-sub-area.component.html',
  styleUrls: ['./add-sub-area.component.scss'],
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
export class AddSubAreaComponent {
  private _dialogRef = inject(MatDialogRef<AddSubAreaComponent>);
  private subAreaJoin: SubAreaJoin = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  public action!: string;
  public frmSubArea!: FormGroup;

  ngOnInit(): void {
    console.log(this.subAreaJoin);
    this.frmSubArea = this.formBuilder.group({
      description: [
        this.subAreaJoin.subArea?.description,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      idArea: [this.subAreaJoin.idArea, [Validators.required]],
      id: [this.subAreaJoin.subArea?.id],
    });
  }

  ngAfterViewInit(): void {
    console.log(this.frmSubArea.value);
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }

  public onSubmit(): void {
    this.action = this.frmSubArea.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmSubArea.get('id')?.value,
      subArea: this.frmSubArea.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmSubArea.invalid;
  }
}
