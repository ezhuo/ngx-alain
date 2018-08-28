import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalShowHTML } from '@theme';

@Component({
  selector: 'app-system-role-show',
  template: tplModalShowHTML,
  styles: [``]
})
export class RoleShowComponent extends ParentModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    delete this.mainSchema.properties.login_pwd;
    delete this.mainSchema.properties.login_pwd2;
    this.formData['org_id'] = this.formData['org_name'];
    this.mainSchema = this.baseFunc.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
