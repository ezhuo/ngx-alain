import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``]
})
export class OrgInfoShowComponent extends ModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formData['parent_id'] = this.formData['parent_name'];
    this.formData['canton_fdn'] = this.formData['canton_text_name'];
    delete this.mainSchema.properties.canton_fdn.ui['asyncData'];
    this.mainSchema = this.appBase.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
