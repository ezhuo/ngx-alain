
import { NgModule } from '@angular/core';
import { AdminRoutingModule, routedComponents, entryComponents } from '@routes/admin/admin-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [AdminRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class AdminModule { }
