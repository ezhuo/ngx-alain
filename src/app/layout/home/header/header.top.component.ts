import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';
@Component({
    selector: 'home-header-top',
    templateUrl: './header.top.component.html',
    styleUrls: ['./header.top.component.less'],
})
export class HomeHeaderTopComponent extends InjectorControl
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

    logout() {
        this.tokenSrv.tokenDestory();
        this.route.navigateByUrl(this.configSrv.router.login);
    }
}
