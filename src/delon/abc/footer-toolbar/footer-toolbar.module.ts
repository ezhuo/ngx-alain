import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdErrorCollectModule } from '@delon/abc/error-collect/error-collect.module';
import { FooterToolbarComponent } from '@delon/abc/footer-toolbar/footer-toolbar.component';

const COMPONENTS = [FooterToolbarComponent];

@NgModule({
  imports: [CommonModule, AdErrorCollectModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdFooterToolbarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdFooterToolbarModule, providers: [] };
  }
}
