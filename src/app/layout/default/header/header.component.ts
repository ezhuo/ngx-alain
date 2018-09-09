import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent extends InjectorControl
    implements OnInit, OnDestroy {
    searchToggleStatus: boolean;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    toggleCollapsedSidebar() {
        this.settingsSrv.setLayout(
            'collapsed',
            !this.settingsSrv.layout.collapsed,
        );
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

    goHome() {
        this.route.navigateByUrl(this.configSrv.router.home);
    }

    logout() {
        this.tokenSrv.tokenDestory();
        this.route.navigateByUrl(this.configSrv.router.login);
    }
}
