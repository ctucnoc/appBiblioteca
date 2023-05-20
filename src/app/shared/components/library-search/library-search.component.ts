import { MaterialModule } from 'src/app/material.module';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericDTO } from '../../model/response/GenericDTO';

@Component({
  selector: 'app-library-search',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss'],
})
export class LibrarySearchComponent {
  private _dialogRef = inject(MatDialogRef<LibrarySearchComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  public lstGeneric: GenericDTO[] = [];
  private action!: string;

  ngOnInit(): void {}

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }
}
