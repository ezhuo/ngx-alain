import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent, LayoutHomeComponent } from '@layout';
import { AuthGuard, configInc, helpers } from '@core';

// 获取默认路径
const routeDefault = helpers.getLastItemBySplit(configInc.router.default, '/') || 'home';

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
  { path: '', redirectTo: routeDefault, pathMatch: 'full' },
  { path: '**', redirectTo: routeDefault },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule { }

export const routedComponents = [];
