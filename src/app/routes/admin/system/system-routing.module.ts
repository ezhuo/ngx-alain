import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core';

import { SystemComponent } from './system.component';

import { AccountComponent } from './account/index.component';
import { AccountEditComponent } from './account/modal/edit.component';
import { AccountShowComponent } from './account/modal/show.component';
import { AccountPwdComponent } from './account/modal/pwd.component';

import { RoleComponent } from './role/index.component';
import { RoleEditComponent } from './role/modal/edit.component';
import { RoleShowComponent } from './role/modal/show.component';

import { LogsComponent } from './logs/index.component';
import { LogsShowComponent } from './logs/modal/show.component';

import { CacheComponent } from './cache/index.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'role', component: RoleComponent },
      { path: 'logs', component: LogsComponent, data: { url: '/logs' } },
      {
        path: 'loglogin',
        component: LogsComponent,
        data: { url: '/loglogin' },
      },
      { path: 'clearcache', component: CacheComponent },
    ],
  },
];

export const entryComponents = [
  AccountEditComponent,
  AccountShowComponent,
  AccountPwdComponent,
  RoleEditComponent,
  RoleShowComponent,
  LogsShowComponent,
];

export const routedComponents = [
  SystemComponent,
  AccountComponent,
  RoleComponent,
  LogsComponent,
  CacheComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
