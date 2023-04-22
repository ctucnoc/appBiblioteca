import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorDTO } from 'src/app/shared/model/response/AuthorDTO';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent {
  private _dialogRef = inject(MatDialogRef<AddAuthorComponent>);
  private _formBuilder = inject(FormBuilder);
  private _cdRef = inject(ChangeDetectorRef);
  private data = inject(MAT_DIALOG_DATA);

  public action!: string;
  public formAuthor!: FormGroup;

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
    this.action = this.formAuthor.value.id ? 'update' : 'add';
    this._dialogRef.close({
      author: this.formAuthor.value,
      action: this.action,
      id: this.formAuthor.value.id,
    });
  }

  public onEditUser(row: AuthorDTO): void {
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
