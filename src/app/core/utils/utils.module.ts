import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

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
