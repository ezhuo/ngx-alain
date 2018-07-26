import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SHFWrapDirective } from '@delon/abc/simple-html-form/wrap.directive';
import { SHFItemComponent } from '@delon/abc/simple-html-form/item.component';
import { AdSHFConfig } from '@delon/abc/simple-html-form/config';

const COMPONENTS = [SHFWrapDirective, SHFItemComponent];

@NgModule({
  imports: [CommonModule, NgZorroAntdModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdSHFModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdSHFModule, providers: [ AdSHFConfig ] };
  }
}
