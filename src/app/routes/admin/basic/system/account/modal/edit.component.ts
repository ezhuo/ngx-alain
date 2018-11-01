import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ModalControl } from '@core';
import { tplModalEditHTML } from '@layout';

@Component({
    selector: 'app-account-edit',
    template: tplModalEditHTML,
    styles: [``],
})
export class AccountEditComponent extends ModalControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.primaryData.val) {
            delete this.schemaData.main.properties.login_pwd;
            delete this.schemaData.main.properties.login_pwd2;
            this.form.data['org_id'] = this.form.data['org_name'];
        } else {
            this.form.data['org_id'] = this.modalParams.tree.origin.title;
        }

        if (!this.userSrv.userInfo.is_group && !this.userSrv.userInfo.admin) {
            this.form.data['role_id'] = 10;
            this.schemaData.main.properties['role_id'].ui['widget'] = 'texts';
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        const formData = this.formatSubmitData($event.value, this.schemaData.main);
        // 如果是新增状态，就添加所属机构值
        if (!this.primaryData.val) {
            formData['org_id'] = this.modalParams.tree.origin.org_id;
            formData['org_fdn'] = this.modalParams.tree.origin.key;
        } else {
            // 编辑状态下不允许修改机构
            delete formData['org_id'];
        }
        this.httpSrv
            .update(this.primaryData.url, formData, this.primaryData.val)
            .subscribe(result => {
                // console.log(result);
                this.modalClose(result);
            });
    }
}
