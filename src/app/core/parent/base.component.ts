import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TitleService, MenuService } from '@delon/theme';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFUISchema } from '@delon/form';

import { ModalService } from '@core/utils/modal.service';
import { NoticeService } from '@core/utils/notice.service';
import { SweetAlertService } from '@core/utils/sweetalert2.service';
import { AuthService } from '@core/data/auth.service';
import { TokenService } from '@core/data/token.service';
import { StateService } from '@core/data/state.service';
import { ConfigService } from '@core/data/config.service';
import { HttpService } from '@core/net/http.service';

import * as helpers from '@core/helpers';

import { BaseFunc } from './base.func';
import { BaseCase } from './base.case';

export class BaseComponent implements OnInit, OnDestroy {

  constructor(protected injector: Injector) { }

  /**
   * 基础处理类
   */
  protected __baseFunc: BaseFunc = new BaseFunc(this);

  /**
   * 业务处理类
   */
  protected __baseCase: BaseCase = new BaseCase(this);

  /**
   * 保存数据流，最后释放
   */
  protected ___pageData$: any = {};

  /**
   * 记录 timeout , 准备销毁
   */
  protected ___pageTimeOut: any = {};

  /**
  * 记录 time Interval，准备销毁
  */
  protected ___pageTimeInterval: any = {};

  /**
   * 当前页面的参数
   */
  protected ___pageParams: any = {};

  // ----------------------------------------

  /**
   * 主要的URL
   */
  protected ___primaryURL = '';

  /**
   * 主键KEY
   */
  protected ___primaryKey = 'id';

  /**
   * 主键值
   */
  protected ___primaryValue: any = null;

  // ----------------------------------------

  /**
   * 主要表单
   */
  protected ___mainForm: FormGroup;

  /**
   * 主要表单的列
   */
  protected ___mainTableColumns: SimpleTableColumn[];

  /**
   * 表格附加参数
   */
  public ___mainTableParams: any = {};

  /**
  * 主要表单值
  */
  protected ___formData: any = {};

  // ----------------------------------------

  /**
   * 当前编辑业务的数据结构
   */
  protected ___mainSchema: SFSchema;

  /**
   * 当前编辑业务的数据结构的排序
   */
  protected ___mainSchemaOrder: any[];

  /**
   * 当前编辑业务的数据结构的 UI
   */
  protected ___mainSchemaUi: SFUISchema;

  // ----------------------------------------

  ngOnInit() { }

  ngOnDestroy() {
    this.__baseFunc.destroy();
    this.__baseFunc = null;
    this.__baseCase = null;
    // 清空其它的
    for (const idx of Object.keys(this)) {
      if (idx && idx.indexOf('___') > -1) {
        this[idx] = null;
      }
    }
    // console.log(this);
  }

  // ----------------------------------------

  get route() {
    return this.injector.get(Router);
  }

  get activeRoute() {
    return this.injector.get(ActivatedRoute);
  }

  get titleSrv() {
    return this.injector.get(TitleService);
  }

  get menuSrv() {
    return this.injector.get(MenuService);
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
    return this.injector.get(SweetAlertService);
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

  get authSrv() {
    return this.injector.get(AuthService);
  }

  get tokenSrv() {
    return this.injector.get(TokenService);
  }

  get frmBuild() {
    return this.injector.get(FormBuilder);
  }

  get FormGroup() {
    return FormGroup;
  }

  get Validators() {
    return Validators;
  }

  // --------------------------------------

  get helpers() {
    return helpers;
  }

  get caseSrv() {
    return this.__baseCase;
  }

  get baseFunc() {
    return this.__baseFunc;
  }

  get primaryURL() {
    return this.___primaryURL;
  }

  set primaryURL(value) {
    this.___primaryURL = value;
  }

  get primaryKey() {
    return this.___primaryKey;
  }

  set primaryKey(value) {
    this.___primaryKey = value;
  }

  get primaryValue() {
    return this.___primaryValue;
  }

  set primaryValue(value) {
    this.___primaryValue = value;
  }

  get pageData$() {
    return this.___pageData$;
  }

  get pageTimeOut() {
    return this.___pageTimeOut;
  }

  get pageTimeInterval() {
    return this.___pageTimeInterval;
  }

  get pageParams() {
    return this.___pageParams;
  }

  set pageTitle(value) {
    this.___pageParams.title = value;
    this.titleSrv.default = value;
  }

  get pageTitle() {
    let next = this.activeRoute;
    if (!this.___pageParams.title) {
      while (next.firstChild) next = next.firstChild;
      const data = (next.snapshot && next.snapshot.data) || {};
      this.___pageParams.title = data.title;
    }

    if (!this.___pageParams.title) {
      const menus = this.menuSrv.getPathByUrl(this.route.url);
      if (!menus || menus.length <= 0) return '';
      const item = menus[menus.length - 1];
      this.___pageParams.title = item.text;
    }

    return this.___pageParams.title;
  }

  set mainForm(value) {
    this.___mainForm = value;
  }

  get mainForm() {
    return this.___mainForm;
  }

  get mainTableParams() {
    this.___mainTableParams = this.___mainTableParams || {};
    if (!this.___mainTableParams.hasOwnProperty('ps')) {
      this.___mainTableParams.ps = this.configSrv.define.table_page_size;
    }
    return this.___mainTableParams;
  }

  set mainSchema(value) {
    this.___mainSchema = value;
  }

  get mainSchema() {
    return this.___mainSchema;
  }

  set mainSchemaOrder(value) {
    this.___mainSchemaOrder = value;
  }

  get mainSchemaOrder() {
    return this.___mainSchemaOrder;
  }

  set mainSchemaUi(value) {
    this.___mainSchemaUi = value;
  }

  get mainSchemaUi() {
    return this.___mainSchemaUi;
  }

  set formData(value) {
    this.___formData = value;
  }

  get formData() {
    return this.___formData;
  }

  set mainTableColumns(value) {
    this.___mainTableColumns = value;
  }

  get mainTableColumns() {
    return this.___mainTableColumns;
  }

  // -- init -----------------------------------------

  /**
   * 初始化
   */
  protected __init(url: string, key: any, params?: any) {
    this.primaryURL = url;
    this.primaryKey = key;
  }

}
