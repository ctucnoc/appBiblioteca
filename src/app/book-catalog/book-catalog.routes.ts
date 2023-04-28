import { Routes } from '@angular/router';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { AreaComponent } from './pages/area/area.component';
import { BibliotecaConstant } from '../shared/constants/BibliotecaConstant';
import { setting } from 'src/environments/setting';
import { SubAreaComponent } from './pages/sub-area/sub-area.component';

export const bookCatalogRoutes: Routes = [
  {
    path: '',
    component: BookCatalogLayoutComponent,
    children: [
      {
        path: 'book',
        component: BookComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_BOOK,
      },
      {
        path: 'author',
        component: AuthorComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_AUTHOR,
      },
      {
        path: 'editorial',
        component: EditorialComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_EDITORIAL,
      },
      {
        path: 'area',
        component: AreaComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_AREA,
      },
      {
        path: 'sub-area',
        component: SubAreaComponent,
        title:
          setting.name_app +
          '_' +
          setting.version_app +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_SUB_AREA,
      },
    ],
  },
];
