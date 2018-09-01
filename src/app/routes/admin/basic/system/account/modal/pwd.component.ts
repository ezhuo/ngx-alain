import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalEditHTML } from '@layout';

@Component({
    selector: 'app-account-pwd',
    template: tplModalEditHTML,
    styles: [``]
})
export class AccountPwdComponent extends ParentModalControl implements OnInit, OnDestroy {

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.modalParams.button.reset.show = false;
        this.modalParams.button.submit.title = '重置密码';
        this.formData['login_pwd'] = '123456';
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        const formData = this.formatSubmitData($event.value, this.mainSchema);
        // 如果是新增状态，就添加所属机构值
        formData['action'] = 2;
        this.freeData.accountPwd = this.httpSrv.update(this.primaryURL + '/check_pwd', formData, this.primaryValue).subscribe((result) => {
            // console.log(result);
            this.modalClose(result);
        });
    }

}
