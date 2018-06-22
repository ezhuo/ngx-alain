import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/edit/edit.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
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
