import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from '../list-author/list-author.component';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent {
  public formAuthor!: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<AddAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Author,
    private _formBuilder: FormBuilder,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //[FormGroup] = frmUser
    this.formAuthor = this._formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    if (this.data) {
      this.onEditUser(this.data);
    }
    this._cdRef.detectChanges();
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  public onSubmit(): void {
    this._dialogRef.close(this.formAuthor.value);
  }

  public onEditUser(row: Author): void {
    this.formAuthor.setValue({
      id: row.id,
      name: row.name,
      lastName: row.lastName,
    });
  }

  public onDisabled(): boolean {
    return this.formAuthor.invalid;
  }
}
