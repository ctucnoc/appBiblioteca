import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListZonaComponent } from '../../components/list-zona/list-zona.component';

@Component({
  selector: 'app-zona',
  standalone: true,
  imports: [CommonModule, ListZonaComponent],
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.scss'],
})
export class ZonaComponent {}
