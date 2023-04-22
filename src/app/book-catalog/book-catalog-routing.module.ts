import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { AreaComponent } from './pages/area/area.component';
import { BibliotecaConstant } from '../shared/constants/BibliotecaConstant';

const routes: Routes = [
  {
    path: '',
    component: BookCatalogLayoutComponent,
    children: [
      { path: 'book', component: BookComponent },
      {
        path: 'author',
        component: AuthorComponent,
        title: 'biblioteca - autor',
      },
      {
        path: 'editorial',
        component: EditorialComponent,
        title: 'biblioteca - editorial',
      },
      {
        path: 'area',
        component: AreaComponent,
        title:
          BibliotecaConstant.TITLE_APP +
          ' - ' +
          BibliotecaConstant.TITLE_PAGE_AREA,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCatalogRoutingModule {}
