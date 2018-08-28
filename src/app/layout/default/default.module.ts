import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutCommonModule } from '../common';

import { LayoutDefaultComponent } from './default.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderSearchComponent } from './header/components/search.component';
import { HeaderIconComponent } from './header/components/icon.component';
import { HeaderTaskComponent } from './header/components/task.component';

import { HeaderUserComponent } from './header/components/user.component';
import { HeaderUserPwdComponent } from './header/components/user/pwd.component';
import { HeaderUserInfoComponent } from './header/components/user/userInfo.component';

const COMPONENTS = [LayoutDefaultComponent, HeaderComponent, SidebarComponent];

const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderUserComponent,
  HeaderUserPwdComponent,
  HeaderIconComponent,
  HeaderTaskComponent,
];

const entryComponents = [HeaderUserPwdComponent, HeaderUserInfoComponent];

@NgModule({
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...entryComponents],
  imports: [SharedModule, LayoutCommonModule],
  exports: [...COMPONENTS, ...HEADERCOMPONENTS],
  providers: [],
  entryComponents: [...entryComponents],
})
export class LayoutDefaultModule {}
