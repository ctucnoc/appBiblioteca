import { Routes } from '@angular/router';
import { LibraryLayoutComponent } from './layout/library-layout/library-layout.component';
import { LibraryComponent } from './pages/library/library.component';
import { setting } from 'src/environments/setting';
import { BibliotecaConstant } from '../shared/constants/BibliotecaConstant';
import { ZonaComponent } from './pages/zona/zona.component';

export const libraryRoutes: Routes = [
  {
    path: '',
    component: LibraryLayoutComponent,
    children: [
      {
        path: 'library',
        component: LibraryComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_LIBRARY,
      },
      {
        path: 'zone',
        component: ZonaComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' | ' +
          BibliotecaConstant.TITLE_PAGE_ZONE,
      },
    ],
  },
];
