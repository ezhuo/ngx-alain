import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseComponent } from '@theme/parent/base.component';

@Component({
  selector: 'app-parent-index-component',
  template: ``,
  styles: [``]
})
export class ParentIndexComponent extends BaseComponent implements OnInit, OnDestroy {
  constructor(protected injector: Injector) { super(injector); }

  ngOnInit() {
    super.ngOnInit();
    this.__logs('进入');
  }

  ngOnDestroy() {
    return super.ngOnDestroy();
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
  }

  modalParamsFromTable(record: any = {}) {
    return {
      primaryKey: this.primaryKey,
      primaryURL: this.primaryURL
    };
  }

  modalParams() {
    return Object.assign({ formData: {} }, this.modalParamsFromTable());
  }

}
