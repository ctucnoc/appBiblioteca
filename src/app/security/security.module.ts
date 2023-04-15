import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityLayoutComponent } from './layout/security-layout/security-layout.component';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SecurityLayoutComponent,
    UserComponent,
    RoleComponent,
    ListUserComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SecurityModule {}
