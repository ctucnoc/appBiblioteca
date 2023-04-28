import { Routes } from '@angular/router';
import { SecurityLayoutComponent } from './layout/security-layout/security-layout.component';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';

export const securityRoutes: Routes = [
  {
    path: '',
    component: SecurityLayoutComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'role', component: RoleComponent },
    ],
  },
];
