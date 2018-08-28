import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, configInc } from '@core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
  },
  { path: '', redirectTo: configInc.router.routeDefault, pathMatch: 'full' },
  { path: '**', redirectTo: configInc.router.routeDefault },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule { }

export const routedComponents = [];
