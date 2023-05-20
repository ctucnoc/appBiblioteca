import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@NgModule({})
export class IconModule {
  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegister: MatIconRegistry
  ) {
    this._matIconRegister.addSvgIcon(
      'twitter',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/twitter.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'my-doc',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/my-docs.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'offer',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/offer.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'file',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/file.svg')
    );
    this._matIconRegister.addSvgIcon(
      'my-profile',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/my-profile.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'user',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg')
    );
    this._matIconRegister.addSvgIcon(
      'order',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/order.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'search',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/search.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'plus',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
    this._matIconRegister.addSvgIcon(
      'cancel',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/cancel.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'logout',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/logout.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'edit',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );
    this._matIconRegister.addSvgIcon(
      'delete',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/delete.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'menu',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg')
    );
    this._matIconRegister.addSvgIcon(
      'eraser',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/eraser.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'elder_sign',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/elder_sign.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'edit_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/edit_solid.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'save_regular',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/save_regular.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'upload_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/upload_solid.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'visibility',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/visibility.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'visibility_off',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/visibility_off.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'computer',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/computer.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'arrow-circle-right',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/arrow-circle-right.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'arrow-circle-left',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/menu/arrow-circle-left.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
    );
    this._matIconRegister.addSvgIcon(
      'sign_out',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/sign_out.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'caret_down',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/caret_down.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'notification',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/notification.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'info',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg')
    );
    this._matIconRegister.addSvgIcon(
      'eye',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/eye.svg')
    );
    this._matIconRegister.addSvgIcon(
      'download',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/download.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'search_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/search_solid.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'print',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/print.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'author',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/author.svg'
      )
    );
    this._matIconRegister.addSvgIcon(
      'password',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/password.svg'
      )
    );
  }
}
