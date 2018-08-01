import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TitleService, MenuService } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';

import * as helpers from '@core/helpers';
import { Subscriber } from 'rxjs';

import { ModalService } from '@core/utils/modal.service';
import { NoticeService } from '@core/utils/notice.service';
import { SweetAlertService } from '@core/utils/sweetalert2.service';
import { HttpService } from '@core/net/http.service';
import { AuthService } from '@core/data/auth.service';
import { TokenService } from '@core/data/token.service';
import { StateService } from '@core/data/state.service';
import { ConfigService } from '@core/data/config.service';

@Component({
  selector: 'com-base-component',
  template: ``,
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor(protected injector: Injector) { }

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

  ngOnInit() {
    console.log(this.titleSrv.getTitle());
  }

  ngOnDestroy() {
    // 清空数据流
    console.log('ngOnDestroy', this.___pageData$);
    for (const idx of Object.keys(this.___pageData$)) {
      if (this.___pageData$[idx] instanceof Subscriber) {
        if (this.___pageData$[idx].unsubscribe) {
          this.___pageData$[idx].unsubscribe();
        }
      }
      if (this.___pageData$[idx] instanceof Promise) {
        // console.log('Promise');
      }
      this.___pageData$[idx] = null;
    }
    this.___pageData$ = {};

    // 清空定时器timeout
    for (const idx of Object.keys(this.___pageTimeOut)) {
      if (this.___pageTimeOut[idx]) {
        clearTimeout(this.___pageTimeOut[idx]);
      }
      this.___pageTimeOut[idx] = null;
    }
    this.___pageTimeOut = {};

    // 清空定时器timeinterval
    for (const idx of Object.keys(this.___pageTimeInterval)) {
      if (this.___pageTimeInterval[idx]) {
        clearInterval(this.___pageTimeInterval[idx]);
      }
      this.___pageTimeInterval[idx] = null;
    }
    this.___pageTimeInterval = {};

    // 清空其它的
    if (this.formData) {
      this.formData = {};
    }
    if (this.primaryValue) {
      this.primaryValue = null;
    }
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

  set mainTableColumns(value) {
    this.___mainTableColumns = value;
  }

  get mainTableColumns() {
    return this.___mainTableColumns;
  }

  set formData(value) {
    this.___formData = value;
  }

  get formData() {
    return this.___formData;
  }

  // -- init -----------------------------------------

  /**
   * 初始化
   */
  protected __init(url: string, key: any, params?: any) {
    this.primaryURL = url;
    this.primaryKey = key;
  }

  /**
   * 表单初始化
   */
  protected __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object, ): void {
    if (!__frmGroup === null) __frmGroup = this.mainForm;
    for (const idx of Object.keys(__frmData)) {
      if (__frmGroup.controls.hasOwnProperty(idx)) {
        __frmGroup.controls[idx].setValue(__frmData[idx]);
      }
    }
  }

  /**
   * 获取主键值
   */
  protected __getPrimaryKeyValue = (__frmData?: any, __primaryKey?: string) => {
    let result = null;
    if (!__frmData) {
      __frmData = this.formData;
    }
    if (!__primaryKey) {
      __primaryKey = this.primaryKey;
    }
    if (!helpers.IsEmpty(__frmData) && __primaryKey) {
      if (!helpers.IsEmpty(__frmData.hasOwnProperty(__primaryKey))) {
        result = __frmData[__primaryKey];
        this.primaryValue = result;
      }
    }
    return result;
  }

  /**
   * 删除对话框
   */
  protected deleteAlert = (__mainUrl?: string, __record?: Object, __primaryKey?: string): any => {
    return new Promise((resolve, reject?: any) => {
      if (!__mainUrl) { __mainUrl = this.primaryURL; }
      if (!__record) { __record = this.formData; }
      if (!__primaryKey) __primaryKey = this.primaryKey;
      const __id = this.__getPrimaryKeyValue(__record, __primaryKey);
      if (!__id) {
        this.noticeSrv.notice_warning('删除无效！');
        reject(false);
      } else {
        this.sweetSrv.confirmWait('确定要删除当前数据吗？', (res) => {
          if (res) {
            return this.pageData$.httpDelAlert = this.httpSrv.deleteById(__mainUrl, __id).toPromise();
          } else {
            return reject(false);
          }
        }).then((res) => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      }
    });
  }

  /**
   * 根据表格，数据导出到EXCEL
   */
  exportXlsFromSt = (
    __st: SimpleTableComponent,
    __url?: string,
    __tableParams?: any,
    __body?: any,
    __options?: any) => {
    __url = __url || this.primaryURL;
    __body = __body || {};
    __tableParams = __tableParams || this.mainTableParams;
    const pi = __tableParams.pi;
    const ps = __tableParams.ps;
    __options = __options || { filename: (this.titleSrv.getTitle() || '数据导出') + '.xlsx', sheetname: '数据导出' };
    if (!__st) {
      return this.noticeSrv.notice_error('导出无效！');
    }
    __tableParams.pi = 1;
    __tableParams.ps = 10000;
    __st.export(__url + helpers.jsonToURL(__body), __options);
    this.pageTimeOut.to = setTimeout(() => {
      __tableParams.pi = pi;
      __tableParams.ps = ps;
    }, 0);
  }


  /**
   * 根据服务器端，数据导出到EXCEL
   */
  exportXlsFromServer = (
    __url?: string,
    __body?: any,
    __options?: any) => {
    __url = __url || this.primaryURL;
    __body = __body || {};
    __options = __options || { filename: (this.titleSrv.getTitle() || '数据导出'), sheetname: '数据导出' };

    __url += '/exports';

    // 配置导出数据
    __body.export_file = encodeURI(__body.export_file || '数据导出');
    __body.export_title = encodeURI(__body.export_title || '数据列表');
    if (__body.export_file.indexOf('.') < 1) {
      __body.export_file += '.xlsx';
    }
    let ext = __body.export_file.split('.');
    if (ext.length > 0) {
      ext = ext[ext.length - 1];
    }

    // 配置API ----------------------------
    const header = this.tokenSrv.getRequestHeaders({});
    __url += '/' + 0 + '/' + header.get('style') + '/' + header.get('token') + '/' + header.get('validate');
    const link = document.createElement('a');
    if (['pdf'].indexOf(ext) == -1) {
      link.download = __body.export_file + '.' + ext;
    }
    link.target = '_blank';
    link.href = this.configSrv.api.base + __url + helpers.jsonToURL(__body);
    document.body.appendChild(link);
    console.log(link.href, header.get('validate'));
    link.click();
    return document.body.removeChild(link);
  }


  /**
   * 写日志
   */
  __logs = (content: string) => {
    this.pageData$.logs = this.httpSrv.post('/logs', {
      title: this.titleSrv.getTitle(),
      content: content
    }).toPromise().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  // ---ng-zorro---------------------------------------------

  /**
   * 数据上传
   */
  nzUploadHandleChange = ($event): void => {
    const status = $event.file.status;
    if (status !== 'uploading') {
      // 正在上传
    }
    if (status === 'done') {
      // 上传完成
      $event.fileList[$event.fileList.length - 1].thumbUrl = this.configSrv.api.show + $event.file.response.url;
      $event.fileList[$event.fileList.length - 1].url = this.configSrv.api.show + $event.file.response.url;
      console.log($event.file, $event.fileList);
      this.msgSrv.msg_success(`${$event.file.name} 上传成功！`);
    } else if (status === 'error') {
      // 上传失败
      console.log($event.file, $event.fileList);
      this.msgSrv.msg_error(`${$event.file.name} 上传失败！`);
    }
  }

  /**
   * 地区选择
   */
  nzCascaderLoadData = (node: any, index: number): PromiseLike<any> => {
    const self = this;
    return new Promise((resolve) => {
      const arrCanton = this.stateSrv.cantonList;
      if (index < 0 && arrCanton.length > 0) {
        node.children = arrCanton;
        resolve();
        return;
      }
      return self.httpSrv.get('/canton/selectTree', { fdn: node.value || '' }).subscribe((appdata: any) => {
        appdata.data = appdata.data || [];
        if (appdata.data.length > 0)
          node.children = appdata.data;
        resolve();
      }, (err) => {

      });
    });
  }

}
