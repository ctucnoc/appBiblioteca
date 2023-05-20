import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from './icons/icon.module';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigabilityComponent } from './components/navigability/navigability.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NavigabilityComponent],
  imports: [CommonModule, IconModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, NavigabilityComponent],
})
export class SharedModule {}
