import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  Injector,
  OnInit,
  OnDestroy,
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
import { DOCUMENT } from '@angular/common';
import { updateHostClass } from '@delon/util';
import { SettingsService } from '@delon/theme';
import { InjectorControl } from '@core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from '@env/environment';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  host: {
    '[class.alain-default]': 'true',
  },
})
export class LayoutDefaultComponent extends InjectorControl
  implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe$ = new Subject<void>();
  isFetching = false;
  @ViewChild('settingHost', { read: ViewContainerRef })
  settingHost: ViewContainerRef;

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

    // scroll to top in change page
    this.route.events.pipe(takeUntil(this.unsubscribe$)).subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
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
      setTimeout(() => {
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

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
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
    const { settings, unsubscribe$ } = this;
    settings.notify
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => this.setClass());
    this.setClass();
  }

  ngOnDestory() {
    super.ngOnDestroy();
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
