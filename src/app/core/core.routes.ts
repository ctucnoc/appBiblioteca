import { Routes } from '@angular/router';
import { CorePublicLayoutComponent } from './layout/core-public-layout/core-public-layout.component';
import { CorePrivateLayoutComponent } from './layout/core-private-layout/core-private-layout.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: CorePublicLayoutComponent,
    loadChildren: () =>
      import('./../auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'book-catalog',
    component: CorePrivateLayoutComponent,
    loadChildren: () =>
      import('../book-catalog/book-catalog.routes').then(
        (m) => m.bookCatalogRoutes
      ),
  },
  {
    path: 'report',
    component: CorePrivateLayoutComponent,
    loadChildren: () =>
      import('../report/report.routes').then((m) => m.reportRoutes),
  },
  {
    path: 'security',
    component: CorePrivateLayoutComponent,
    loadChildren: () =>
      import('../security/security.routes').then((m) => m.securityRoutes),
  },
];
