import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { SharedModule } from 'src/app/shared/shared.module';
import { validaorPasswordMatch } from 'src/app/shared/validators/Validator';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent {
  private _formBuilder = inject(FormBuilder);

  public frmChangePassword!: FormGroup;
  public hide = true;
  public title!: string;
  public subtitle!: string;
  public namePage!: string;
  ngOnInit(): void {
    this.title = BibliotecaConstant.TITLE_MODULE_SECURITY;
    this.namePage = BibliotecaConstant.TITLE_PAGE_CHANGE_PASSWORD;
    this.subtitle = BibliotecaConstant.TITLE_PAGE_CHANGE_PASSWORD;

    // [formGroup]="frmChangePassword" autocomplete="off"
    this.frmChangePassword = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repiteNewPassword: [
        '',
        [Validators.required, Validators.minLength(8), validaorPasswordMatch()],
      ],
    });
  }

  public getIcon(): string {
    return this.hide ? 'visibility' : 'visibility_off';
  }

  public blDisabledSend(): boolean {
    return this.frmChangePassword.invalid;
  }
}
