import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { setting } from 'src/environments/setting';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _router: Router = inject(Router);

  public title!: string;

  ngOnInit(): void {
    this.title = setting.name_app + '_' + setting.version_app;
  }

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

  public goToEditorial(): void {
    this._router.navigate(['book-catalog/editorial']);
  }
  public goToArea(): void {
    this._router.navigate(['book-catalog/area']);
  }
  public goToSubArea(): void {
    this._router.navigate(['book-catalog/sub-area']);
  }

  public goToLibrary(): void {
    this._router.navigate(['library-config/library']);
  }
  public goToZone(): void {
    this._router.navigate(['library-config/zone']);
  }
}
