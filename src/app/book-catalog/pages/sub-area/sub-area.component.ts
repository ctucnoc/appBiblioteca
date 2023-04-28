import { Component } from '@angular/core';
import { ListSubAreaComponent } from '../../components/list-sub-area/list-sub-area.component';

@Component({
  selector: 'app-sub-area',
  templateUrl: './sub-area.component.html',
  styleUrls: ['./sub-area.component.scss'],
  standalone: true,
  imports: [ListSubAreaComponent],
})
export class SubAreaComponent {}
