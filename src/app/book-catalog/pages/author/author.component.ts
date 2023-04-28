import { Component } from '@angular/core';
import { ListAuthorComponent } from '../../components/list-author/list-author.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  standalone: true,
  imports: [ListAuthorComponent],
})
export class AuthorComponent {}
