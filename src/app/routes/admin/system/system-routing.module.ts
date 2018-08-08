import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core';

import { SystemComponent } from './system.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/account.edit.component';
import { AccountShowComponent } from './account/account.show.component';

export const entryComponents = [
  AccountEditComponent,
  AccountShowComponent
];

export const routedComponents = [
  SystemComponent,
  AccountComponent
];

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
