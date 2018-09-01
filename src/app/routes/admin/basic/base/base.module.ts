import { NgModule } from '@angular/core';
import {
    BaseRoutingModule,
    routedComponents,
    entryComponents
} from './base-routing.module';

import { SharedModule } from '@shared';

@NgModule({
    imports: [BaseRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class BaseModule { }
