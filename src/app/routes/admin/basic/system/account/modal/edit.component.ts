import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalControl } from '@core';
import { tplModalEditHTML } from '@layout';

@Component({
  selector: 'app-account-edit',
  template: tplModalEditHTML,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AccountEditComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.dataSource.val) {
      delete this.schemaData.edit.properties.login_pwd;
      delete this.schemaData.edit.properties.login_pwd2;
      this.form.data['org_id'] = this.form.data['org_name'];
    } else {
      if (this.modalData.data) {
        this.form.data['org_id'] = this.modalData.data.origin.title;
      } else {
        this.form.data['org_id'] = this.form.data['org_name'];
      }
    }

    if (!this.userSrv.userInfo.is_group && !this.userSrv.userInfo.admin) {
      this.form.data['role_id'] = 10;
      this.schemaData.edit.properties['role_id'].ui['widget'] = 'texts';
    }
  }

  onSubmit($event: any) {
    this.cdr.detectChanges();
    const formData = this.appBase.__formatSubmitData(
      $event.value,
      this.schemaData.edit,
    );
    // 如果是新增状态，就添加所属机构值
    if (!this.dataSource.val) {
      formData['org_id'] = this.modalData.data.origin.org_id;
      formData['org_fdn'] = this.modalData.data.origin.key;
    } else {
      // 编辑状态下不允许修改机构
      delete formData['org_id'];
    }
    this.freeData.update = this.httpSrv
      .update(this.dataSource.url, formData, this.dataSource.val)
      .subscribe(result => {
        this.modalClose(result);
      });
  }
}
