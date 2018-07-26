import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendComponent } from '@delon/abc/trend/trend.component';

const COMPONENTS = [TrendComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdTrendModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdTrendModule, providers: [] };
  }
}
