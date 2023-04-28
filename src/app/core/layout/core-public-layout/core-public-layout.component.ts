import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-core-public-layout',
  templateUrl: './core-public-layout.component.html',
  styleUrls: ['./core-public-layout.component.scss'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, SharedModule],
})
export class CorePublicLayoutComponent {}
