import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'home-header-nav',
    templateUrl: './header.nav.component.html',
    styleUrls: ['./header.nav.component.less'],
})
export class HomeHeaderNavComponent extends InjectorControl
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
