import { NgModule, ModuleWithProviders } from '@angular/core';

import { NoticeService } from '@core/utils/notice.service';
import { ModalService } from '@core/utils/modal.service';
import { SweetAlertService } from '@core/utils/sweetalert2.service';


const SERVICES = [
  NoticeService,
  ModalService,
  SweetAlertService
];

@NgModule({
  imports: [],
  exports: [],
  providers: [
    ...SERVICES
  ]
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [...SERVICES]
    };
  }
}
