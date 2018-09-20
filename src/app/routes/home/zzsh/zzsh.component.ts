import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'com-home-zzsh',
    templateUrl: './zzsh.component.html',
    styleUrls: ['./zzsh.component.less'],
})
export class ZzshComponent extends IndexControl
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
