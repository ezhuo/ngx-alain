import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

// dashboard pages
import { DashboardV1Component } from './ngalain/dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './ngalain/dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './ngalain/dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './ngalain/dashboard/workplace/workplace.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      { path: 'dashboard/v1', component: DashboardV1Component },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'dashboard/monitor', component: DashboardMonitorComponent },
      { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
      {
        path: 'widgets',
        loadChildren: './ngalain/widgets/widgets.module#WidgetsModule',
      },
      { path: 'style', loadChildren: './ngalain/style/style.module#StyleModule' },
      { path: 'delon', loadChildren: './ngalain/delon/delon.module#DelonModule' },
      { path: 'extras', loadChildren: './ngalain/extras/extras.module#ExtrasModule' },
      { path: 'pro', loadChildren: './ngalain/pro/pro.module#ProModule' },
      { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule { }

export const routedComponents = [DashboardV1Component, DashboardAnalysisComponent, DashboardMonitorComponent, DashboardWorkplaceComponent];
