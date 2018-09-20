import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``]
})
export class AccountShowComponent extends ModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    delete this.mainSchema.properties.login_pwd;
    delete this.mainSchema.properties.login_pwd2;
    this.formData['org_id'] = this.formData['org_name'];
    this.mainSchema = this.appBase.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
