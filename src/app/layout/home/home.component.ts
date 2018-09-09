import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import {
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError,
} from '@angular/router';
import { InjectorControl } from '@core';

@Component({
    selector: 'layout-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class LayoutHomeComponent extends InjectorControl
    implements OnInit, OnDestroy {
    isFetching = false;

    constructor(protected injector: Injector) {
        super(injector);

        // scroll to top in change page
        this.freeData.route = this.route.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                this.noticeSrv.nzMsgSrv.error(`无法加载${evt.url}路由`, {
                    nzDuration: 1000 * 3,
                });
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
