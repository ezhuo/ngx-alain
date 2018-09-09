import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import {
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError,
    NavigationCancel,
} from '@angular/router';
import { InjectorControl } from '@core';

@Component({
    selector: 'layout-default',
    templateUrl: './default.component.html',
})
export class LayoutDefaultComponent extends InjectorControl
    implements OnInit, OnDestroy {
    isFetching = false;

    constructor(protected injector: Injector) {
        super(injector);

        // menu
        this.tokenSrv.menuReload();

        // scroll to top in change page
        this.freeData.route = this.route.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (
                evt instanceof NavigationError ||
                evt instanceof NavigationCancel
            ) {
                this.isFetching = false;
                if (evt instanceof NavigationError) {
                    this.noticeSrv.nzMsgSrv.error(`无法加载${evt.url}路由`, {
                        nzDuration: 1000 * 3,
                    });
                }
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            this.freeTimeOut.scroll = setTimeout(() => {
                this.scrollSrv.scrollToTop();
                this.isFetching = false;
            }, 100);
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }
}
