import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import {
    SchemaRoutingModule,
    routedComponents,
    entryComponents
} from './schema-routing.module';


@NgModule({
    imports: [SchemaRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class SchemaModule { }
