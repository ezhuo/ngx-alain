import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '@layout/default/default.component';
import { LayoutHomeComponent } from '@layout/home/home.component';
import { AuthGuard } from '@core/data/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutHomeComponent,
    // canLoad: [AuthGuard],
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },
    ],
  },
  {
    path: 'admin',
    component: LayoutDefaultComponent,
    // canLoad: [AuthGuard],
    children: [
      { path: '', loadChildren: './admin/admin.module#AdminModule' },
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule { }

export const routedComponents = [];
