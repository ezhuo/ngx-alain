import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core';

import { LayoutDefaultComponent } from '@layout';

import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardV1Component } from './ngalain/dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './ngalain/dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './ngalain/dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './ngalain/dashboard/workplace/workplace.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'schema', loadChildren: () => import('./basic/schema/schema.module').then(m => m.SchemaModule) },
      { path: 'base', loadChildren: () => import('./basic/base/base.module').then(m => m.BaseModule) },
      { path: 'system', loadChildren: () => import('./basic/system/system.module').then(m => m.SystemModule) },
      {
        path: 'demo',
        canLoad: [AuthGuard],
        children: [
          { path: 'dashboard/v1', component: DashboardV1Component },
          { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
          { path: 'dashboard/monitor', component: DashboardMonitorComponent },
          {
            path: 'dashboard/workplace',
            component: DashboardWorkplaceComponent,
          },
          {
            path: 'widgets',
            loadChildren: () => import('./ngalain/widgets/widgets.module').then(m => m.WidgetsModule),
          },
          { path: 'style', loadChildren: () => import('./ngalain/style/style.module').then(m => m.StyleModule) },
          { path: 'delon', loadChildren: () => import('./ngalain/delon/delon.module').then(m => m.DelonModule) },
          { path: 'extras', loadChildren: () => import('./ngalain/extras/extras.module').then(m => m.ExtrasModule) },
          { path: 'pro', loadChildren: () => import('./ngalain/pro/pro.module').then(m => m.ProModule) },
        ],
      },
      { path: 'dashboard', redirectTo: 'demo/dashboard/v1', pathMatch: 'full' },
      { path: '**', redirectTo: 'demo/dashboard/v1' },
    ],
  },
];

export const routedComponents = [
  DashboardComponent,
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
];

export const entryComponents = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
