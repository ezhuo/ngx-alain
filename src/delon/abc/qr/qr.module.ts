import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdQRConfig } from '@delon/abc/qr/qr.config';
import { QRComponent } from '@delon/abc/qr/qr.component';
import { QRService } from '@delon/abc/qr/qr.service';

const COMPONENTS = [QRComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdQRModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdQRModule, providers: [AdQRConfig, QRService] };
  }
}
