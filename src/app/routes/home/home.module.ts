
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import { HomeRoutingModule, routedComponents, entryComponents } from './home-routing.module';


@NgModule({
    imports: [HomeRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class HomeModule { }
