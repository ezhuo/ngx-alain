import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseComponent } from '@theme/parent/base.component';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-parent-modal-component',
  template: ``,
  styles: [``]
})
export class ParentModalComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  get modalRef() {
    return this.injector.get(NzModalRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.__getPrimaryKeyValue();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  modalClose(result: any = false) {
    this.modalRef.destroy(result);
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
  }

}
