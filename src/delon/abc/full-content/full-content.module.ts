import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullContentComponent } from '@delon/abc/full-content/full-content.component';
import { FullContentToggleDirective } from '@delon/abc/full-content/full-content-toggle.directive';
import { FullContentService } from '@delon/abc/full-content/full-content.service';

const COMPONENTS = [FullContentComponent, FullContentToggleDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdFullContentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdFullContentModule,
      providers: [FullContentService],
    };
  }
}
