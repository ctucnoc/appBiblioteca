import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NavItem } from '../../model/local/NavItem';

@Component({
  selector: 'app-library-manu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './library-manu.component.html',
  styleUrls: ['./library-manu.component.scss'],
})
export class LibraryManuComponent {
  @Input() menu!: NavItem;
}
