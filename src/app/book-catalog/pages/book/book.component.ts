import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  imports: [],
})
export class BookComponent {
  constructor(private _title: Title) {}
  ngOnInit(): void {
    this._title.setTitle('biblioteca - libro');
  }
}
