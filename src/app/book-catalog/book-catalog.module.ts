import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCatalogRoutingModule } from './book-catalog-routing.module';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { SharedModule } from '../shared/shared.module';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { ListEditorialComponent } from './components/list-editorial/list-editorial.component';
import { AddEditorialComponent } from './components/add-editorial/add-editorial.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookCatalogLayoutComponent,
    BookComponent,
    AuthorComponent,
    EditorialComponent,
    ListEditorialComponent,
    AddEditorialComponent,
  ],
  imports: [
    CommonModule,
    BookCatalogRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BookCatalogModule {}
