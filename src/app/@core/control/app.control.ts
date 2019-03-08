import { OnInit, OnDestroy, Injector } from '@angular/core';
import { InjectorControl } from './injector.control';
import { AppFunc } from './app.func';
import { AppCase } from './app.case';
import {
  SchemaData,
  TableData,
  FormData,
  DataSource,
  ModalData,
  PageData,
  PageParams,
} from '../model';
import * as config from '../config.inc';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
  /**
   * 基础处理类
   */
  protected ___appFunc: AppFunc = new AppFunc(this);

  /**
   * 业务处理类
   */
  protected ___appCase: AppCase = new AppCase(this);

  /**
   * 当前页面的参数
   */
  protected ___pageData: PageData = { title: null };

  /**
   * modal对话框中的参数传递
   */
  protected ____modalData: ModalData = {
    button: {
      submit: {
        show: true,
        title: '保存',
      },
      reset: {
        show: true,
        title: '重置',
      },
      close: {
        show: true,
        title: '关闭',
      },
    },
    title: null,
    data: null,
  };

  /**
   * 与服务器数据交换
   * @protected
   * @type {DataSource}
   * @memberof AppControl
   */
  protected ___dataSource: DataSource = {
    url: '',
    key: 'id',
    val: null,
  };

  /**
   * 表格数据
   */
  protected ___tableData: TableData = {
    col: null,
    req: {
      params: {
        ps: config.define.tablePageSize,
      },
    },
  };

  /**
   * 表单数据
   */
  protected ___formData: FormData = {
    group: null,
    data: {},
  };

  protected ___schemaData: SchemaData = {
    search: null,
    searchOrder: null,
    searchUi: null,

    edit: null,
    editOrder: null,
    editUi: null,

    password: null,
    passwordOrder: null,
    passwordUi: null,
  };

  // --------------------------------------

  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

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

  // ----------------------------------------

  get appCase() {
    return this.___appCase;
  }

  get appBase() {
    return this.___appFunc;
  }

  get pageData() {
    return this.___pageData;
  }

  set pageTitle(value) {
    this.___pageData.title = value;
    this.titleSrv.default = value;
  }

  get pageTitle() {
    let next = this.activeRoute;
    if (!this.___pageData.title) {
      while (next.firstChild) next = next.firstChild;
      const data = (next.snapshot && next.snapshot.data) || {};
      this.___pageData.title = data.title;
    }

    if (!this.___pageData.title) {
      const menus = this.menuSrv.getPathByUrl(this.route.url);
      if (!menus || menus.length <= 0) return '';
      const item = menus[menus.length - 1];
      this.___pageData.title = item.text;
    }

    return this.___pageData.title;
  }

  get schemaData() {
    return this.___schemaData;
  }

  set schemaData(value: SchemaData) {
    this.___schemaData = value;
  }

  set modalData(value: ModalData) {
    this.____modalData = value;
  }

  get modalData() {
    return this.____modalData;
  }

  get tableData() {
    return this.___tableData;
  }

  set tableData(value: TableData) {
    this.___tableData = value;
  }

  get tableParams() {
    return this.tableData.req.params;
  }

  get tableReq() {
    return this.tableData.req;
  }

  get form() {
    return this.___formData;
  }

  set form(value: FormData) {
    this.___formData = value;
  }

  get dataSource() {
    return this.___dataSource;
  }

  set dataSource(value: DataSource) {
    this.___dataSource = value;
  }

  // -- init -----------------------------------------

  /**
   * 初始化
   */
  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: PageParams,
  ): void {
    if (!this.helpers.isEmpty(dataSource)) {
      this.dataSource = Object.assign(this.dataSource, dataSource);
    }
    return super.__init__(child, dataSource, params);
  }
}
