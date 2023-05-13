import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLibraryComponent } from '../../components/list-library/list-library.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, ListLibraryComponent],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent {}
