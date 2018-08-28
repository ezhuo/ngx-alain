import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalShowHTML } from '@theme';

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``]
})
export class OrgInfoShowComponent extends ParentModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formData['parent_id'] = this.formData['parent_name'];
    this.formData['canton_fdn'] = this.formData['canton_text_name'];
    delete this.mainSchema.properties.canton_fdn.ui['asyncData'];
    this.mainSchema = this.baseFunc.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
