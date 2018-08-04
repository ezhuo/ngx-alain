import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/data/auth-guard.service';

import { SchemaComponent } from './schema.component';
import { SchemaDemoComponent } from './schema/demo.component';
import { AccountEditComponent } from './schema/edit/edit.component';
import { SchemaShowComponent } from './schema/show.component';
import { SchemaEditComponent } from './schema/edit.component';

const routes: Routes = [
    {
        path: '',
        component: SchemaComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'schema-demo', pathMatch: 'full' },
            { path: 'schema-demo', component: SchemaDemoComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchemaRoutingModule { }

export const entryComponents = [AccountEditComponent, SchemaShowComponent, SchemaEditComponent];

export const routedComponents = [
    SchemaDemoComponent, SchemaComponent
];
