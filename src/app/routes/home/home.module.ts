
import { NgModule } from '@angular/core';
import { HomeRoutingModule, routedComponents, entryComponents } from '@routes/home/home-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [HomeRoutingModule, SharedModule],
    exports: [],
    declarations: [...routedComponents, ...entryComponents],
    providers: [],
    entryComponents: [...entryComponents]
})
export class HomeModule { }
