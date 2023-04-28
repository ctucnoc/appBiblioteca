import { Component } from '@angular/core';
import { ListAreaComponent } from '../../components/list-area/list-area.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  standalone: true,
  imports: [ListAreaComponent],
})
export class AreaComponent {}
