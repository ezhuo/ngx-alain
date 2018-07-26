import { NgModule } from '@angular/core';
import {
    SystemRoutingModule,
    routedComponents,
    entryComponents
} from '@routes/admin/system/system-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [SystemRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class SystemModule { }
