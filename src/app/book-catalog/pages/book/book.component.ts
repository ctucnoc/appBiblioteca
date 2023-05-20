import { Component } from '@angular/core';
import { ListBookComponent } from '../../components/list-book/list-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  imports: [ListBookComponent],
})
export class BookComponent {
  ngOnInit(): void {}
}
