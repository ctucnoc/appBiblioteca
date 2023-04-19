import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from './icons/icon.module';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IconModule, MaterialModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
