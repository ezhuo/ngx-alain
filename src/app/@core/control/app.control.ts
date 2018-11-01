import { OnInit, OnDestroy, Injector } from '@angular/core';

import { InjectorControl } from './injector.control';
import { AppFunc } from './app.func';
import { AppCase } from './app.case';
import { SchemaData, TableData, FormData, PrimaryData } from './app.interface';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
    this.___appFunc = new AppFunc(this);
    this.___appCase = new AppCase(this);
  }

  // ----------------------------------------

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.___appFunc = null;
    this.___appCase = null;
    // 清空其它的
    for (const idx of Object.keys(this)) {
      if (idx && idx.indexOf('___') > -1) {
        this[idx] = null;
      }
    }
  }

  /**
   * 基础处理类
   */
  protected ___appFunc: AppFunc;

  /**
   * 业务处理类
   */
  protected ___appCase: AppCase;

  /**
   * 当前页面的参数
   */
  protected ___pageParams: any = {};

  /**
   * modal对话框中的参数传递
   */
  protected ___modalParams: any = {};

  /**
   * 与服务器数据交换
   * @protected
   * @type {PrimaryData}
   * @memberof AppControl
   */
  protected ___primaryData: PrimaryData = {
    url: '',
    key: 'id',
    val: null,
  };

  /**
   * 表格数据
   */
  protected ___tableData: TableData = {
    col: null,
    params: {},
  };

  /**
   * 表单数据
   */
  protected ___formData: FormData = {
    group: null,
    data: {},
  };

  protected ___schemaData: SchemaData = {
    main: null,
    mainOrder: null,
    mainUi: null,
    search: null,
    searchOrder: null,
    searchUi: null,
  };

  // --------------------------------------

  get appCase() {
    return this.___appCase;
  }

  get appBase() {
    return this.___appFunc;
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

  get mainTableParams() {
    this.tableData.params = this.tableData.params || {};
    if (!this.tableData.params.hasOwnProperty('ps')) {
      this.tableData.params.ps = this.configSrv.define.table_page_size;
    }
    return this.tableData.params;
  }

  get schemaData() {
    return this.___schemaData;
  }

  set schemaData(value: SchemaData) {
    this.___schemaData = value;
  }

  set modalParams(value) {
    this.___modalParams = value;
  }

  get modalParams() {
    return this.___modalParams;
  }

  get tableData() {
    return this.___tableData;
  }

  set tableData(value: TableData) {
    this.___tableData = value;
  }

  get form() {
    return this.___formData;
  }

  set form(value: FormData) {
    this.___formData = value;
  }

  get primaryData() {
    return this.___primaryData;
  }

  set primaryData(value: PrimaryData) {
    this.___primaryData = value;
  }

  // -- init -----------------------------------------

  /**
   * 初始化
   */
  protected __init(url: string, key: any, params?: any) {
    this.primaryData.url = url;
    this.primaryData.key = key;
  }
}
