import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorCollectComponent } from '@delon/abc/error-collect/error-collect.component';
import { AdErrorCollectConfig } from '@delon/abc/error-collect/error-collect.config';

const COMPONENTS = [ErrorCollectComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdErrorCollectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdErrorCollectModule,
      providers: [AdErrorCollectConfig],
    };
  }
}
