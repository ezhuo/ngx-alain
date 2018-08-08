
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { AdminRoutingModule, routedComponents, entryComponents } from './admin-routing.module';

@NgModule({
    imports: [AdminRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class AdminModule { }
