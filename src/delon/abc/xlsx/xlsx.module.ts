import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelonUtilModule } from '@delon/util';
import { XlsxService } from '@delon/abc/xlsx/xlsx.service';
import { XlsxDirective } from '@delon/abc/xlsx/xlsx.directive';
import { XlsxConfig, DA_XLSX_CONFIG } from '@delon/abc/xlsx/interface';

const COMPONENTS = [XlsxDirective];

@NgModule({
  imports: [CommonModule, DelonUtilModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdXlsxModule {
  static forRoot(config?: XlsxConfig): ModuleWithProviders {
    return {
      ngModule: AdXlsxModule,
      providers: [XlsxService, { provide: DA_XLSX_CONFIG, useValue: config }],
    };
  }
}
