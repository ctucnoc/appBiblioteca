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
import { ListAuthorComponent } from './components/list-author/list-author.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AreaComponent } from './pages/area/area.component';
import { ListAreaComponent } from './components/list-area/list-area.component';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { SubAreaComponent } from './pages/sub-area/sub-area.component';
import { AddSubAreaComponent } from './components/add-sub-area/add-sub-area.component';
import { ListSubAreaComponent } from './components/list-sub-area/list-sub-area.component';

@NgModule({
  declarations: [
    BookCatalogLayoutComponent,
    BookComponent,
    AuthorComponent,
    EditorialComponent,
    ListEditorialComponent,
    AddEditorialComponent,
    ListAuthorComponent,
    AddAuthorComponent,
    AreaComponent,
    ListAreaComponent,
    AddAreaComponent,
    SubAreaComponent,
    AddSubAreaComponent,
    ListSubAreaComponent,
  ],
  imports: [
    CommonModule,
    BookCatalogRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class BookCatalogModule {}
