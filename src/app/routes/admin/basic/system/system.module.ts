import { NgModule } from '@angular/core';
import {
    SystemRoutingModule,
    routedComponents,
    entryComponents
} from './system-routing.module';

import { SharedModule } from '@shared';

@NgModule({
    imports: [SystemRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class SystemModule { }
