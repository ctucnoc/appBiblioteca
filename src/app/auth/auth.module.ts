import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { SingOutComponent } from './pages/sing-out/sing-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [AuthLayoutComponent, SingInComponent, SingOutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthModule {}
