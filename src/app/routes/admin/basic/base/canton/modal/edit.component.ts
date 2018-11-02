import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ModalControl } from '@core';
import { tplModalEditHTML } from '@layout';

@Component({
  selector: 'app-canton-edit',
  template: tplModalEditHTML,
  styles: [``],
})
export class CantonEditComponent extends ModalControl
  implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.dataSource.val) {
      this.form.data['parent_org_name'] = this.modalData.data.origin.title;
    }
    console.log(this.form.data);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit($event: any) {
    const formData = this.formatSubmitData($event.value, this.schemaData.main);
    console.log(formData, $event.value);
    // 如果是新增状态，就添加所属机构值
    if (!this.dataSource.val) {
      formData['parent_id'] = this.modalData.data.origin.org_id;
    } else {
      // 编辑状态下不允许修改机构
      delete formData['parent_id'];
    }
    this.httpSrv
      .update(this.dataSource.url, formData, this.dataSource.val)
      .subscribe(result => {
        // console.log(result);
        this.modalClose(result);
      });
  }
}
