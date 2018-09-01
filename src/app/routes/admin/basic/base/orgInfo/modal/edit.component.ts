import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalEditHTML } from '@layout';

@Component({
    selector: 'app-orginfo-edit',
    template: tplModalEditHTML,
    styles: [``],
})
export class OrgInfoEditComponent extends ParentModalControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.primaryValue) {
            this.formData[
                'parent_org_name'
            ] = this.modalParams.tree.origin.title;
        }
        console.log(this.formData);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        const formData = this.formatSubmitData($event.value, this.mainSchema);
        console.log(formData, $event.value);
        // 如果是新增状态，就添加所属机构值
        if (!this.primaryValue) {
            formData['parent_id'] = this.modalParams.tree.origin.org_id;
        } else {
            // 编辑状态下不允许修改机构
            delete formData['parent_id'];
        }
        this.httpSrv
            .update(this.primaryURL, formData, this.primaryValue)
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
