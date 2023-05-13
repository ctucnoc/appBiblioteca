import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-library-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './library-layout.component.html',
  styleUrls: ['./library-layout.component.scss'],
})
export class LibraryLayoutComponent {}
