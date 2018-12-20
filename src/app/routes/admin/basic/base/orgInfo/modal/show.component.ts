import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgInfoShowComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.data['parent_id'] = this.form.data['parent_name'];
    this.form.data['canton_fdn'] = this.form.data['canton_text_name'];
    delete this.schemaData.edit.properties.canton_fdn.ui['asyncData'];
    this.schemaData.edit = this.appBase.__schemaFormSetTexts({}, []);
  }
}
