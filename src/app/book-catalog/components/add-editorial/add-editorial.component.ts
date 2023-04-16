import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editorial } from '../list-editorial/list-editorial.component';

@Component({
  selector: 'app-add-editorial',
  templateUrl: './add-editorial.component.html',
  styleUrls: ['./add-editorial.component.scss'],
})
export class AddEditorialComponent {
  constructor(
    private _dialogRef: MatDialogRef<AddEditorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Editorial
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSend(): void {
    this._dialogRef.close({ description: 'mensaje de prueba' });
  }
}
