import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/data/auth-guard.service';

import { CustomerComponent } from '@routes/admin/customer/customer.component';
import { AccountComponent } from '@routes/admin/customer/account/account.component';
import { AccountEditComponent } from '@routes/admin/customer/account/edit/edit.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
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
export class CustomerRoutingModule { }

export const entryComponents = [AccountEditComponent];

export const routedComponents = [
    CustomerComponent, AccountComponent
];
