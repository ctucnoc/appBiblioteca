import { Component, SimpleChange } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent {
  constructor(private _title: Title) {
    console.log('crce constructor -> {}');
  }

  ngOnChanges(simple: SimpleChange) {
    console.log('crce ngOnChanges -> {} ' + simple);
  }

  ngOnInit(): void {
    console.log('crce ngOnInit -> {} ' + this._title);
  }

  ngAfterViewInit() {
    console.log('crce ngAfterViewInit -> {} ');
  }

  ngDoCheck() {
    console.log('crce ngDoCheck -> {} ');
  }

  ngOnDestroy(): void {
    console.log('crce ngOnDestroy -> {} ');
  }

  ngAfterContentInit() {
    console.log('crce ngAfterContentInit -> {} ');
  }
}
