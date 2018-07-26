import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarListComponent } from '@delon/abc/avatar-list/avatar-list.component';
import { AvatarListItemComponent } from '@delon/abc/avatar-list/avatar-list-item.component';

const COMPONENTS = [AvatarListComponent, AvatarListItemComponent];

// region: zorro modules

import { NgZorroAntdModule } from 'ng-zorro-antd';

const ZORROMODULES = [NgZorroAntdModule];

// endregion

@NgModule({
  imports: [CommonModule, ...ZORROMODULES],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdAvatarListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdAvatarListModule, providers: [] };
  }
}
