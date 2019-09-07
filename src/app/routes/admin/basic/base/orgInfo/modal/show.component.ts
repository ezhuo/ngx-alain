import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IndexControl } from '@core';
import { tplModalShowHTML } from '@layout';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection,
})
export class OrgInfoShowComponent extends IndexControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this, null, { changeDetection });
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.data['parent_id'] = this.form.data['parent_name'];
    this.form.data['canton_fdn'] = this.form.data['canton_text_name'];
    delete this.schemaData.edit.properties.canton_fdn.ui['asyncData'];
    this.schemaData.edit = this.__schemaFormSetTexts({}, []);
  }
}
