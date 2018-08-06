import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/data/auth-guard.service';

import { SystemComponent } from './system.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

export const entryComponents = [
  AccountEditComponent
];

export const routedComponents = [
  SystemComponent, AccountComponent
];
