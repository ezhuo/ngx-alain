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
    this.form.data['parent_id'] = this.form.data['parent_name'];
    this.form.data['canton_fdn'] = this.form.data['canton_text_name'];
    delete this.schemaData.main.properties.canton_fdn.ui['asyncData'];
    this.schemaData.main = this.appBase.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
