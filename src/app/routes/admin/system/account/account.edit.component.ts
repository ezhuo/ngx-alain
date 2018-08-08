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
        console.log(this.formData);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        $event.value.role_id = 0;
        $event.value.company_id = 1;
        $event.value.company_fdn = '1.';
        console.log($event.value);
        this.formatSubmitData($event.value, this.mainSchema);
        this.httpSrv.update(this.primaryURL, $event.value, this.primaryValue).subscribe((result) => {
            console.log(result);
            this.modalClose(result);
        });
    }

}
