import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCatalogRoutingModule } from './book-catalog-routing.module';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BookCatalogLayoutComponent, BookComponent, AuthorComponent],
  imports: [CommonModule, BookCatalogRoutingModule, SharedModule],
})
export class BookCatalogModule {}
