import {
  OnInit,
  OnDestroy,
  Injector,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {
  TitleService,
  MenuService,
  SettingsService,
  ScrollService,
} from '@delon/theme';

import { CacheService } from '@delon/cache';

import {
  AuthService,
  TokenService,
  StateService,
  ConfigService,
  UserService,
} from '../data';

import { ComponentData, PageParams } from '../model';
import { ModalService, NoticeService } from '../utils';
import { HttpService } from '../net';
import * as helpers from '../helpers';

export class InjectorControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: any) {
    this.__init__(child);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stateSrv.destroy(this, [
      'freeData',
      'freeTimeOut',
      'freeTimeInterval',
    ]);
    // 清空其它的
    for (const idx of Object.keys(this)) {
      if (idx && idx.indexOf('___') > -1) {
        this[idx] = null;
      }
    }
  }

  /**
   * 保存数据流，最后释放
   */
  protected ___freeData: any = {};
  /**
   * 记录 timeout , 准备销毁
   */
  protected ___freeTimeOut: any = {};

  /**
   * 记录 time Interval，准备销毁
   */
  protected ___freeTimeInterval: any = {};

  /**
   * 组件的原数据
   * @protected
   * @type {ComponentData}
   * @memberof InjectorControl
   */
  protected ___componentData: ComponentData = { name: null, meta: null };

  get freeData() {
    return this.___freeData;
  }

  get freeTimeOut() {
    return this.___freeTimeOut;
  }

  get freeTimeInterval() {
    return this.___freeTimeInterval;
  }

  get componentData() {
    return this.___componentData;
  }

  get route() {
    return this.injector.get(Router);
  }

  get activeRoute() {
    return this.injector.get(ActivatedRoute);
  }

  get eleRef() {
    return this.injector.get(ElementRef);
  }

  get titleSrv() {
    return this.injector.get(TitleService);
  }

  get menuSrv() {
    return this.injector.get(MenuService);
  }

  get settingsSrv() {
    return this.injector.get(SettingsService);
  }

  get cacheSrv() {
    return this.injector.get(CacheService);
  }

  get scrollSrv() {
    return this.injector.get(ScrollService);
  }

  get modalSrv() {
    return this.injector.get(ModalService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get msgSrv() {
    return this.injector.get(NoticeService);
  }

  get sweetSrv() {
    return this.injector.get(NoticeService).sweet;
  }

  get httpSrv() {
    return this.injector.get(HttpService);
  }

  get stateSrv() {
    return this.injector.get(StateService);
  }

  get configSrv() {
    return this.injector.get(ConfigService);
  }

  get userSrv() {
    return this.injector.get(UserService);
  }

  get authSrv() {
    return this.injector.get(AuthService);
  }

  get tokenSrv() {
    return this.injector.get(TokenService);
  }

  get cdr() {
    return this.injector.get(ChangeDetectorRef);
  }

  get FormBuilder() {
    return this.injector.get(FormBuilder);
  }

  get FormGroup() {
    return FormGroup;
  }

  get FormControl() {
    return FormControl;
  }

  get Validators() {
    return Validators;
  }

  get helpers() {
    return helpers;
  }

  protected __init__(
    child: Object | Function,
    dataSource?: any,
    params?: PageParams,
  ) {
    if (!helpers.isEmpty(child)) {
      const obj = helpers.isObject(child) ? <any>child.constructor : child;
      if (obj && !helpers.isEmpty(obj.__annotations__)) {
        this.componentData.meta = obj.__annotations__[0];
      }
      this.componentData.name = obj.name;
      if (this.configSrv.appDebug)
        console.log(
          '[LOG] __init__ >> ' + this.componentData.name + ' ：',
          this.componentData.meta,
        );
    }
    if (!helpers.isEmpty(params) && params.changeDetection != undefined) {
      this.componentData.meta = this.componentData.meta || {};
      this.componentData.meta.changeDetection = params.changeDetection;
    }
    return null;
  }

  public detectChanges = () => {
    if (!helpers.isEmpty(this.componentData.meta)) {
      if (
        this.componentData.meta.changeDetection ==
        ChangeDetectionStrategy.OnPush
      ) {
        const sto = setTimeout(() => {
          this.cdr.detectChanges();
          clearTimeout(sto);
        }, 0);
      }
    }
  };
}
