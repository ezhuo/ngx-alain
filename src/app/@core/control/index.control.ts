import { OnInit, OnDestroy, Injector } from '@angular/core';
import { STComponent, STColumnButtonModal, STData, STChange } from '@delon/abc';
import { ModalOptionsForService, NzModalRef } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';
import { AppControl } from './app.control';
import { DataSource, PageParams, ExportConfig } from '../model';

export class IndexControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
    // 只有后台才允许记录操作日志
    if ((this.route.url + '').indexOf('/admin/') > -1) {
      if (!this.modalRef) this.__commonLogs('进入');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  get modalRef() {
    return this.injector.get(NzModalRef, null);
  }

  protected __init__(child: Object | Function, dataSource?: DataSource, params?: PageParams) {
    return super.__init__(child, dataSource, params);
  }

  /**
   * modal 对话框 ，在表格中弹出时的 数据整理
   * @memberof IndexControl
   */
  public modalTable = (
    component: any,
    params?: STColumnButtonModal,
    options?: ModalOptionsForService,
  ): STColumnButtonModal => {
    params = params || {};
    params.component = component;
    if (params.params && this.helpers.isFunction(params.params)) {
      const fn = params.params;
      params.params = (record: STData) => {
        return this.__formatModalParams(fn(record));
      };
    } else params.params = this.__formatModalParams;
    params.modalOptions = this.helpers.deepExtend(options || {}, {
      nzStyle: { top: '20px' },
    });
    return params;
  };

  modalClose(result?: any) {
    if (!result) result = false;
    this.modalRef.destroy(result);
  }

  get modalTitle() {
    if (this.modalData.title) {
      return this.modalData.title;
    } else {
      return !this.helpers.isEmpty(this.dataSource.val) ? '编辑' : '添加';
    }
  }

  /**
   * modal 对话框 ，不在表格中弹出时的 数据整理
   * @memberof IndexControl
   */
  public modalEditStatic = (
    comp: any,
    params?: any,
    size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
    options?: any,
  ): Observable<any> => {
    return this.modalSrv.static(comp, this.helpers.deepExtend(params || {}, this.__formatModalParams()), size, options);
  };

  /**
   * 查询提交
   * @param st
   * @param searchData
   */
  public searchSubmit = (st: STComponent, searchData: any, isReload = false) => {
    // searchData = this.helpers.deepExtend({}, this.tableParams, searchData || {});
    for (const idx of Object.keys(searchData)) {
      if (this.helpers.isEmpty(searchData[idx])) {
        delete searchData[idx];
      } else if (this.helpers.isArray(searchData[idx])) {
        searchData[idx] = searchData[idx].join(',');
      }
    }
    if (st) {
      if (isReload) st.reload(searchData);
      else st.reset(searchData);
    }
    this.detectChanges();
    return st;
  };

  public stChange(e: STChange) {
    this.detectChanges();
    // console.log('change', e);
  }

  /**
   * 删除对话框
   */
  public deleteAlert = (__mainUrl?: string, __record?: Object, __primaryKey?: string): any => {
    return new Promise((resolve, reject?: any) => {
      if (!__mainUrl) {
        __mainUrl = this.dataSource.url;
      }
      if (!__record) {
        __record = this.form.data;
      }
      if (!__primaryKey) __primaryKey = this.dataSource.key;
      const __id = this.__getPrimaryKeyValue(__record, __primaryKey);
      if (!__id) {
        this.noticeSrv.noticeWarning('删除无效！');
        reject(false);
      } else {
        this.noticeSrv.sweet
          .confirmWait('确定要删除当前数据吗？', res => {
            if (res) {
              return (this.freeData.httpDelAlert = this.httpSrv.deleteById(__mainUrl, __id).toPromise());
            } else {
              return reject(false);
            }
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  public stReset(__st: STComponent, __stParams: any) {
    if (__st) {
      __stParams = __stParams || this.tableParams;
      __st.reset(__stParams);
      this.detectChanges();
    }
  }

  /**
   * 根据表格，数据导出到EXCEL
   */
  public exportXlsFromSt = (__st: STComponent, __url?: string, __tableParams?: any, __body?: any, __options?: any) => {
    __url = __url || this.dataSource.url;
    __tableParams = __tableParams || this.tableParams;
    __options = __options || {};
    __options.filename = __options.filename || (this.titleSrv.getTitle() || '数据导出') + '.xlsx';
    __options.sheetname = __options.sheetname || '数据导出';
    if (!__st) return this.noticeSrv.noticeError('导出无效！');

    __body = this.helpers.deepExtend({}, __body || {}, __tableParams, {
      pi: 1,
      ps: 10000,
    });
    Object.keys(__body).forEach(kk => {
      if (__body[kk] == null || __body[kk] == undefined || __body[kk] == '') {
        delete __body[kk];
      }
    });

    this.httpSrv.get(__url, __body).subscribe(({ data }: any) => {
      if (data && data.list) {
        data.list.forEach(row => {
          Object.keys(row).forEach(item => {
            if (row[item] == null || row[item] == undefined) {
              row[item] = '';
            }
          });
        });
        __st.export(this.helpers.stDataAddIndex(data.list), __options);
      }
    });
  };

  /**
   * 根据服务器端，数据导出到EXCEL
   */
  public exportXlsFromServer = (__url?: string, __body?: any, __config?: ExportConfig) => {
    __url = __url || this.dataSource.url;
    __body = __body || {};
    __config = __config || {};
    __url += '/exports';

    // 配置导出数据
    __config.filename = encodeURI(__config.filename || '数据导出');
    __config.title = encodeURI(__config.title || '数据列表');
    if (__config.filename.indexOf('.') < 1) {
      __config.filename += '.xls';
    }
    const arr = __config.filename.split('.');
    let ext = '';
    if (arr.length > 0) {
      ext = ext[arr.length - 1];
    }

    // 配置API ----------------------------
    const header = this.tokenSrv.getRequestHeaders({ id: __body.id + '' });
    __url += '/' + __body.id + '/' + header.get('style') + '/' + header.get('token') + '/' + header.get('validate');
    const link = document.createElement('a');
    if (['pdf'].indexOf(ext) == -1) {
      link.download = __config.filename + '.' + ext;
    }
    link.target = '_blank';
    link.href = this.configSrv.api.base + __url + this.helpers.jsonToURL(__config);
    document.body.appendChild(link);
    // console.log(link.href, header.get('validate'));
    link.click();
    return document.body.removeChild(link);
  };

  /**
   * 数据上传
   */
  public nzUploadHandleChange = ($event: any, $isMult?: boolean, $thumbUrl: string = null): void => {
    const file = $event.file;
    const fileList: any[] = $event.fileList;
    const status = file.status;
    if ($isMult === undefined) {
      $isMult = true;
    }
    if (status !== 'uploading') {
      // 正在上传
    }
    if (status === 'done') {
      // 上传完成
      file.response.url = this.configSrv.api.show + file.response.url;
      if (!$isMult && fileList.length > 1) {
        fileList.shift();
      }
      fileList[fileList.length - 1].thumbUrl = $thumbUrl || file.response.url;
      fileList[fileList.length - 1].url = file.response.url;
      // console.log(file, fileList);
      this.msgSrv.msgSuccess(`${file.name} 上传成功！`);
    } else if (status === 'error') {
      // 上传失败
      // console.log(file, fileList);
      this.msgSrv.msgError(`${file.name} 上传失败！`);
    } else if (status == 'removed') {
      $event.type = 'success';
    }
  };

  /**
   * 地区加载数据
   */
  public nzCascaderLoadData = (node: any, index: number): PromiseLike<any> => {
    return new Promise(resolve => {
      const arrCanton = this.stateSrv.cantonList;
      if (index < 0 && arrCanton.length > 0) {
        node.children = arrCanton;
        resolve(true);
        return;
      }
      return this.httpSrv.get('/canton/selectTree', { fdn: node.value || '' }).subscribe(
        (appdata: any) => {
          appdata.data = appdata.data || [];
          if (appdata.data.length > 0) node.children = appdata.data;
          resolve(true);
        },
        err => {},
      );
    });
  };

  /**
   * 动态表单中的地区加载数据
   */
  public nzCascaderLoadDataBySchema = (node?: any): any => {
    if (!node) {
      const arrCanton = this.stateSrv.cantonList;
      if (arrCanton.length > 0) {
        return of(arrCanton);
      } else {
        return of([]);
      }
    }
    return this.nzCascaderLoadData(node, 0);
  };
}
