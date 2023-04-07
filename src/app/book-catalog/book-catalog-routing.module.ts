import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';

const routes: Routes = [
  {
    path: '',
    component: BookCatalogLayoutComponent,
    children: [
      { path: 'book', component: BookComponent },
      { path: 'author', component: AuthorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCatalogRoutingModule {}
