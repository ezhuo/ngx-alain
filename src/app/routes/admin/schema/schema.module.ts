import { NgModule } from '@angular/core';
import { SchemaRoutingModule, routedComponents, entryComponents } from './schema-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [SchemaRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class SchemaModule { }
