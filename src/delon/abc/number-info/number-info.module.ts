import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberInfoComponent } from '@delon/abc/number-info/number-info.component';

const COMPONENTS = [NumberInfoComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdNumberInfoModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdNumberInfoModule, providers: [] };
  }
}
