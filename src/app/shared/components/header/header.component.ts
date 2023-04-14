import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _router: Router = inject(Router);

  constructor() {}

  public goToBook(): void {
    this._router.navigate(['book-catalog/book']);
  }

  public goToAuthor(): void {
    this._router.navigate(['book-catalog/author']);
  }

  public goToUser(): void {
    this._router.navigate(['security/user']);
  }

  public goToRole(): void {
    this._router.navigate(['security/role']);
  }
}
