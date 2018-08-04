import { OnInit, OnDestroy, Injector } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseComponent } from './base.component';

export class ParentModalComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  get modalRef() {
    return this.injector.get(NzModalRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseFunc.__getPrimaryKeyValue();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    console.log('ngOnDestroy');
  }

  modalClose(result: any = false) {
    this.modalRef.destroy(result);
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
  }

}
