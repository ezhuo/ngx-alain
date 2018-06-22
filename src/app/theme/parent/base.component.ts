import { Component, OnInit, OnDestroy, Inject, Injector, Optional } from '@angular/core';
import { ModalService } from '@core/utils/modal.service';
import { NoticeService } from '@core/utils/notice.service';
import { SweetAlertService } from '@core/utils/sweetalert2.service';
import { HttpService } from '@core/net/http.service';
import { StateService } from '@core/data/state.service';
import { AuthService } from '@core/data/auth.service';

@Component({
  selector: 'com-base-component',
  template: ``,
})
export class BaseComponent implements OnInit, OnDestroy {

  constructor(protected injector: Injector) { }

  get modalSrv() {
    return this.injector.get(ModalService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get msgSrv() {
    return this.injector.get(NoticeService);
  }

  get sweetSrv() {
    return this.injector.get(SweetAlertService);
  }

  get httpSrv() {
    return this.injector.get(HttpService);
  }

  get stateSrv() {
    return this.injector.get(StateService);
  }

  get authSrv() {
    return this.injector.get(AuthService);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
