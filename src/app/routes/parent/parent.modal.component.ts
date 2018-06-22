import { Component, OnInit, OnDestroy, Injector, Optional } from '@angular/core';
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

  modalClose() {
    this.modalRef.destroy();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
