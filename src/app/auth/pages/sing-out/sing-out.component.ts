import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-sing-out',
  templateUrl: './sing-out.component.html',
  styleUrls: ['./sing-out.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MaterialModule],
})
export class SingOutComponent {}
