import { NgModule, ModuleWithProviders } from '@angular/core';

import { NoticeService } from './notice.service';
import { ModalService } from './modal.service';
import { SweetAlertService } from './sweetalert2.service';


const SERVICES = [
  NoticeService,
  ModalService,
  SweetAlertService
];

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [...SERVICES]
    };
  }
}
