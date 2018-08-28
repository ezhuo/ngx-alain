import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalEditHTML } from '@theme';

@Component({
    selector: 'app-account-edit',
    template: tplModalEditHTML,
    styles: [``]
})
export class AccountEditComponent extends ParentModalControl implements OnInit, OnDestroy {

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.primaryValue) {
            delete this.mainSchema.properties.login_pwd;
            delete this.mainSchema.properties.login_pwd2;
            this.formData['org_id'] = this.formData['org_name'];
        } else {
            this.formData['org_id'] = this.modalParams.tree.origin.title;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        const formData = this.formatSubmitData($event.value, this.mainSchema);
        // 如果是新增状态，就添加所属机构值
        if (!this.primaryValue) {
            formData['org_id'] = this.modalParams.tree.origin.org_id;
            formData['org_fdn'] = this.modalParams.tree.origin.key;
        } else {
            // 编辑状态下不允许修改机构
            delete formData['org_id'];
        }
        this.httpSrv.update(this.primaryURL, formData, this.primaryValue).subscribe((result) => {
            // console.log(result);
            this.modalClose(result);
        });
    }

}
