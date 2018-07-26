import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ObserversModule } from '@angular/cdk/observers';

import { DescListComponent } from '@delon/abc/desc-list/desc-list.component';
import { DescListItemComponent } from '@delon/abc/desc-list/desc-list-item.component';
import { AdDescListConfig } from '@delon/abc/desc-list/desc-list.config';

const COMPONENTS = [DescListComponent, DescListItemComponent];

@NgModule({
  imports: [CommonModule, NgZorroAntdModule, ObserversModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdDescListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdDescListModule, providers: [AdDescListConfig] };
  }
}
