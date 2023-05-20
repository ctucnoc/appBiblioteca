import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ZoneLibraryJoin } from '../list-zona/list-zona.component';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { UpperDirective } from 'src/app/shared/directive/input/upper.directive';

@Component({
  selector: 'app-add-zona',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    UpperDirective,
  ],
  templateUrl: './add-zona.component.html',
  styleUrls: ['./add-zona.component.scss'],
})
export class AddZonaComponent {
  private _dialogRef = inject(MatDialogRef<AddZonaComponent>);
  private zoneLibraryJoin: ZoneLibraryJoin = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  public action!: string;
  public frmZone!: FormGroup;

  ngOnInit(): void {
    console.log(this.zoneLibraryJoin);
    this.frmZone = this.formBuilder.group({
      description: [
        this.zoneLibraryJoin.ZoneDTO?.description,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      idLibrary: [this.zoneLibraryJoin.idLibrary, [Validators.required]],
      id: [this.zoneLibraryJoin.ZoneDTO?.id],
    });
  }

  ngAfterViewInit(): void {
    console.log(this.frmZone.value);
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }

  public onSubmit(): void {
    this.action = this.frmZone.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this._dialogRef.close({
      id: this.frmZone.get('id')?.value,
      zone: this.frmZone.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmZone.invalid;
  }
}
