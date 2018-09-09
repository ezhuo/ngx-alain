import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core';

import { BaseComponent } from './base.component';

import { OrgInfoComponent } from './orgInfo/index.component';
import { OrgInfoEditComponent } from './orgInfo/modal/edit.component';
import { OrgInfoShowComponent } from './orgInfo/modal/show.component';

import { DictComponent } from './dict/index.component';
import { DictEditComponent } from './dict/modal/edit.component';

import { CantonComponent } from './canton/index.component';
import { CantonEditComponent } from './canton/modal/edit.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'orgInfo', component: OrgInfoComponent },
            {
                path: 'dicDict',
                component: DictComponent,
                data: { url: 'dictdic' },
            },
            {
                path: 'sysDict',
                component: DictComponent,
                data: { url: 'sysdic' },
            },
            { path: 'canton', component: CantonComponent },
        ],
    },
];

export const routedComponents = [
    BaseComponent,
    OrgInfoComponent,
    DictComponent,
    CantonComponent,
];

export const entryComponents = [
    OrgInfoEditComponent,
    OrgInfoShowComponent,

    DictEditComponent,
    CantonEditComponent,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BaseRoutingModule {}
