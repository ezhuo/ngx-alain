import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LayoutDefaultComponent } from './default.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderSearchComponent } from './header/components/search.component';
import { HeaderNotifyComponent } from './header/components/notify.component';
import { HeaderTaskComponent } from './header/components/task.component';
import { HeaderIconComponent } from './header/components/icon.component';
import { HeaderFullScreenComponent } from './header/components/fullscreen.component';
import { HeaderStorageComponent } from './header/components/storage.component';
import { HeaderUserComponent } from './header/components/user.component';

const COMPONENTS = [
    LayoutDefaultComponent,
    HeaderComponent,
    SidebarComponent,
];

const HEADERCOMPONENTS = [
    HeaderSearchComponent,
    HeaderNotifyComponent,
    HeaderTaskComponent,
    HeaderIconComponent,
    HeaderFullScreenComponent,
    HeaderStorageComponent,
    HeaderUserComponent,
];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
    imports: [SharedModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: []
})
export class LayoutDefaultModule { }
