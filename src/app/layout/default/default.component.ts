import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewChild,
    ComponentFactoryResolver,
    ViewContainerRef,
    AfterViewInit,
    ElementRef,
    Renderer2,
    Inject,
} from '@angular/core';
import {
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError,
    NavigationCancel,
} from '@angular/router';
import { InjectorControl } from '@core';
import { DOCUMENT } from '@angular/common';
import { NzIconService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';

// #region icons

import {
    MenuFoldOutline,
    MenuUnfoldOutline,
    SearchOutline,
    SettingOutline,
    FullscreenOutline,
    FullscreenExitOutline,
    BellOutline,
    LockOutline,
    PlusOutline,
    UserOutline,
    LogoutOutline,
    EllipsisOutline,
    GlobalOutline,
    ArrowDownOutline,
    // Optional
    GithubOutline,
    AppstoreOutline,
} from '@ant-design/icons-angular/icons';

const ICONS = [
    MenuFoldOutline,
    MenuUnfoldOutline,
    SearchOutline,
    SettingOutline,
    FullscreenOutline,
    FullscreenExitOutline,
    BellOutline,
    LockOutline,
    PlusOutline,
    UserOutline,
    LogoutOutline,
    EllipsisOutline,
    GlobalOutline,
    ArrowDownOutline,
    // Optional
    GithubOutline,
    AppstoreOutline,
];

// #endregion

import { environment } from '@env/environment';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
@Component({
    selector: 'layout-default',
    templateUrl: './default.component.html',
    preserveWhitespaces: false,
    host: {
        '[class.alain-default]': 'true',
    },
})
export class LayoutDefaultComponent extends InjectorControl
    implements OnInit, OnDestroy, AfterViewInit {
    private notify$: Subscription;
    isFetching = false;
    @ViewChild('settingHost', { read: ViewContainerRef })
    settingHost: ViewContainerRef;

    get iconSrv() {
        return this.injector.get(NzIconService);
    }

    get resolver() {
        return this.injector.get(ComponentFactoryResolver);
    }

    get settings() {
        return this.injector.get(SettingsService);
    }

    get el() {
        return this.injector.get(ElementRef);
    }

    get renderer() {
        return this.injector.get(Renderer2);
    }

    constructor(
        protected injector: Injector,
        @Inject(DOCUMENT) private doc: any,
    ) {
        super(injector);

        // menu
        this.tokenSrv.menuReload();

        this.iconSrv.addIcon(...ICONS);

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

    private setClass() {
        const { el, renderer, settings } = this;
        const layout = settings.layout;
        updateHostClass(
            el.nativeElement,
            renderer,
            {
                ['alain-default']: true,
                [`alain-default__fixed`]: layout.fixed,
                [`alain-default__boxed`]: layout.boxed,
                [`alain-default__collapsed`]: layout.collapsed,
            },
            true,
        );

        this.doc.body.classList[layout.colorWeak ? 'add' : 'remove'](
            'color-weak',
        );
    }

    ngAfterViewInit(): void {
        // Setting componet for only developer
        if (!environment.production) {
            setTimeout(() => {
                const settingFactory = this.resolver.resolveComponentFactory(
                    SettingDrawerComponent,
                );
                this.settingHost.createComponent(settingFactory);
            }, 22);
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.notify$ = this.settings.notify.subscribe(() => this.setClass());
        this.setClass();
    }

    ngOnDestory() {
        super.ngOnDestroy();
        this.notify$.unsubscribe();
    }
}
