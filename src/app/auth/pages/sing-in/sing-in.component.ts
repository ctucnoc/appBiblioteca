import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class SingInComponent {
  public hide: boolean = true;
  public msgError!: string;
  public frmSingIn!: FormGroup;
  @ViewChild('password') password!: ElementRef;
  constructor(
    private _title: Title,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    console.log('crce constructor -> {}');
  }

  ngOnInit(): void {
    // [formGroup]="frmSingIn" autocomplete="off"
    this.frmSingIn = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      idSubsidiary: ['', [Validators.required]],
    });
    console.log('crce ngOnInit -> {} ' + this._title);
  }
  public getIcon(): string {
    return this.hide ? 'visibility' : 'visibility_off';
  }
}
