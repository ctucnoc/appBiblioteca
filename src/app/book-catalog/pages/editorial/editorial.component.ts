import { Component } from '@angular/core';
import { ListEditorialComponent } from '../../components/list-editorial/list-editorial.component';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.scss'],
  standalone: true,
  imports: [ListEditorialComponent],
})
export class EditorialComponent {}
