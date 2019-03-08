import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'app-system-role-show',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection,
})
export class RoleShowComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    delete this.schemaData.edit.properties.login_pwd;
    delete this.schemaData.edit.properties.login_pwd2;
    this.form.data['org_id'] = this.form.data['org_name'];
    this.schemaData.edit = this.appBase.__schemaFormSetTexts({}, []);
  }
}
