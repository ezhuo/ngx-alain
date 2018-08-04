import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/data/auth-guard.service';

import { DashboardV1Component } from './ngalain/dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './ngalain/dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './ngalain/dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './ngalain/dashboard/workplace/workplace.component';

const routes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    children:
        [
            { path: 'schema', loadChildren: './schema/schema.module#SchemaModule' },
            { path: 'system', loadChildren: './system/system.module#SystemModule' },
            {
                path: 'demo',
                canLoad: [AuthGuard],
                children:
                    [
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
                    ]
            },
            { path: 'dashboard', redirectTo: 'demo/dashboard/v1', pathMatch: 'full' },
            { path: '**', redirectTo: 'demo/dashboard/v1' },
        ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

export const entryComponents = [];

export const routedComponents = [
    DashboardV1Component,
    DashboardAnalysisComponent,
    DashboardMonitorComponent,
    DashboardWorkplaceComponent
];
