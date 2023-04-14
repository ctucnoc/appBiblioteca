import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { SingOutComponent } from './pages/sing-out/sing-out.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'sing-in', component: SingInComponent, title: 'Iniciar Sessión' },
      { path: '', redirectTo: 'sing-in', pathMatch: 'full' },
      { path: 'sing-out', component: SingOutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
