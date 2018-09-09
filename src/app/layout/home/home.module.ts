import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { LayoutCommonModule } from '../common';

import { LayoutHomeComponent } from './home.component';
import { HomeHeaderTopComponent } from './header/header.top.component';
import { HomeHeaderNavComponent } from './header/header.nav.component';
import { HomeHeaderUserComponent } from './header/components/home.user.component';

import { HomeFooterComponent } from './footer/footer.component';

const COMPONENTS = [LayoutHomeComponent];

const HEADERCOMPONENTS = [
    HomeHeaderTopComponent,
    HomeHeaderUserComponent,
    HomeHeaderNavComponent,
    HomeFooterComponent,
];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
    imports: [SharedModule, LayoutCommonModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: [],
})
export class LayoutHomeModule {}
