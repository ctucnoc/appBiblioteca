import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { setting } from 'src/environments/setting';
import { BibliotecaConstant } from '../shared/constants/BibliotecaConstant';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_DASHBOARD,
      },
    ],
  },
];
