import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { ExceptionRoutingModule, routedComponents } from './exception-routing.module';

@NgModule({
    declarations: [...routedComponents],
    imports: [ExceptionRoutingModule, SharedModule],
    exports: [],
    providers: []
})
export class ExceptionModule { }
