import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { LayoutHomeModule } from '@layout';

import {
    HomeRoutingModule,
    routedComponents,
    entryComponents
} from './home-routing.module';


@NgModule({
    imports: [HomeRoutingModule, LayoutHomeModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class HomeModule { }
