import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  title = 'appBiblioteca';
  constructor() {
    console.log('crce environment -> {} ' + environment.name);
  }
}
