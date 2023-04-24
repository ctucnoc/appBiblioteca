import { NgModule } from '@angular/core';
import { AreaDTO } from './AreaDTO';
export interface SubAreaDTO {
  id?: number;
  description?: string;
  area?: AreaDTO;
}
