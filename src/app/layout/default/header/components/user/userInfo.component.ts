import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { ParentModalControl } from '@core';

@Component({
    selector: 'header-user-info',
    templateUrl: `./userInfo.component.html`,
    styleUrls: [`./userInfo.component.less`],
})
export class HeaderUserInfoComponent extends ParentModalControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }
}
