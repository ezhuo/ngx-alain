import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReuseTabComponent } from '@delon/abc/reuse-tab/reuse-tab.component';
import { ReuseTabContextComponent } from '@delon/abc/reuse-tab/reuse-tab-context.component';
import { ReuseTabContextDirective } from '@delon/abc/reuse-tab/reuse-tab-context.directive';
import { ReuseTabContextMenuComponent } from '@delon/abc/reuse-tab/reuse-tab-context-menu.component';

const COMPONENTS = [ReuseTabComponent];
const NOEXPORTS = [
  ReuseTabContextMenuComponent,
  ReuseTabContextComponent,
  ReuseTabContextDirective,
];

import { OverlayModule } from '@angular/cdk/overlay';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, OverlayModule],
  declarations: [...COMPONENTS, ...NOEXPORTS],
  entryComponents: [ReuseTabContextMenuComponent],
  exports: [...COMPONENTS],
})
export class AdReuseTabModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdReuseTabModule,
    };
  }
}
