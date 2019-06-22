import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IndexControl } from '@core';
import { tplModalEditHTML } from '@layout';

const changeDetection = ChangeDetectionStrategy.Default;

@Component({
  selector: 'app-orginfo-edit',
  template: tplModalEditHTML,
  styles: [``],
  changeDetection,
})
export class OrgInfoEditComponent extends IndexControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this, {}, {changeDetection});
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.dataSource.val) {
      this.form.data['parent_id'] = this.modalData.data.original.org_id;
      // this.form.data['parent_org_name'] = this.modalData.data.origin.title;
    }
  }

  onSubmit($event: any) {
    const formData = this.appBase.__formatSubmitData(
      $event.value,
      this.schemaData.edit,
    );
    // 如果是新增状态，就添加所属机构值
    // if (!this.dataSource.val) {
    //   formData['parent_id'] = this.modalData.data.origin.org_id;
    // } else {
    //   // 编辑状态下不允许修改机构
    //   delete formData['parent_id'];
    // }
    this.httpSrv
      .update(this.dataSource.url, formData, this.dataSource.val)
      .subscribe(
        result => {
          this.modalClose(result);
        },
        err => {
          console.log(err);
        },
      );
  }
}
