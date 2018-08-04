import { OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseComponent } from './base.component';

export class ParentIndexComponent extends BaseComponent implements OnInit, OnDestroy {
  constructor(protected injector: Injector) { super(injector); }

  ngOnInit() {
    super.ngOnInit();
    console.log('ngOnInit' , this);
    this.caseSrv.__logs('进入');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    console.log('ngOnDestroy');
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
  }

  modalParamsFromTable(record?: any) {
    return {
      primaryKey: this.primaryKey,
      primaryURL: this.primaryURL,
      mainSchema: this.mainSchema,
      mainSchemaUi: this.mainSchemaUi,
    };
  }

  modalParams() {
    // return {};
    return this.helpers.deepExtend({ formData: this.formData || {} }, this.modalParamsFromTable());
  }

}
