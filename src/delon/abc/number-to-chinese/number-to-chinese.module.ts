import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToChinesePipe } from '@delon/abc/number-to-chinese/number-to-chinese.pipe';

const PIPES = [NumberToChinesePipe];

@NgModule({
  imports: [CommonModule],
  declarations: PIPES,
  exports: PIPES,
})
export class AdNumberToChineseModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdNumberToChineseModule, providers: [] };
  }
}
