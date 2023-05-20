import { Routes } from '@angular/router';
import { SecurityLayoutComponent } from './layout/security-layout/security-layout.component';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { setting } from 'src/environments/setting';
import { BibliotecaConstant } from '../shared/constants/BibliotecaConstant';

export const securityRoutes: Routes = [
  {
    path: '',
    component: SecurityLayoutComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_USER,
      },
      {
        path: 'role',
        component: RoleComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_AUTHORITY,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_CHANGE_PASSWORD,
      },
    ],
  },
];
