import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelonUtilModule } from '@delon/util';

import { ImageDirective } from '@delon/abc/image/image.directive';
import { AdImageConfig } from '@delon/abc/image/image.config';

const DIRECTIVES = [ImageDirective];

@NgModule({
  imports: [CommonModule, DelonUtilModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class AdImageModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdImageModule, providers: [AdImageConfig] };
  }
}
