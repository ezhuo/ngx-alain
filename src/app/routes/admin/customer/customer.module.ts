import { NgModule } from '@angular/core';
import { CustomerRoutingModule, routedComponents, entryComponents } from '@routes/admin/customer/customer-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CustomerRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class CustomerModule { }
