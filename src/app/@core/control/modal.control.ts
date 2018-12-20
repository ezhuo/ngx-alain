import { OnInit, OnDestroy, Injector } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppControl } from './app.control';

export class ModalControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  get modalRef() {
    return this.injector.get(NzModalRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  modalClose(result?: any) {
    if (!result) result = false;
    this.modalRef.destroy(result);
  }

  get modalTitle() {
    if (this.modalData.title) {
      return this.modalData.title;
    } else {
      return !this.helpers.isEmpty(this.dataSource.val) ? '编辑' : '添加';
    }
  }

  // ------------------
}
