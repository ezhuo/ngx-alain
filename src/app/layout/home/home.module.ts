import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { LayoutDefaultModule } from '../default/default.module';

import { LayoutHomeComponent } from './home.component';
import { HomeHeaderTopComponent } from './header/home.header.top.component';
import { HomeHeaderUserComponent } from './header/components/home.user.component';
import { HomeHeaderNavComponent } from './header/home.header.nav.component';
import { HomeFooterComponent } from './footer/home.footer.component';

const COMPONENTS = [
    LayoutHomeComponent,
];

const HEADERCOMPONENTS = [
    HomeHeaderTopComponent,
    HomeHeaderUserComponent,
    HomeHeaderNavComponent,
    HomeFooterComponent
];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
    imports: [SharedModule, LayoutDefaultModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: []
})
export class LayoutHomeModule { }
