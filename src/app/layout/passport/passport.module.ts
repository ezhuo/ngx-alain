import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { PassportRoutingModule, routedComponents } from './passport-routing.module';

@NgModule({
    declarations: [...routedComponents],
    imports: [PassportRoutingModule, SharedModule],
    exports: [],
    providers: []
})
export class PassportModule { }
