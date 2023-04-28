import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from './icons/icon.module';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigabilityComponent } from './components/navigability/navigability.component';

@NgModule({
  declarations: [HeaderComponent, NavigabilityComponent],
  imports: [CommonModule, IconModule, MaterialModule],
  exports: [HeaderComponent, NavigabilityComponent, IconModule],
})
export class SharedModule {}
