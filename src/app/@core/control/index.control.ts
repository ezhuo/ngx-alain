import { OnInit, OnDestroy, Injector } from '@angular/core';
import { STComponent, STColumnButtonModal, STData, STChange } from '@delon/abc';
import { ModalOptionsForService, NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AppControl } from './app.control';
import { DataSource, PageParams } from '../model';

export class IndexControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
    // 只有后台才允许记录操作日志
    if ((this.route.url + '').indexOf('/admin/') > -1) {
      if (!this.modalRef) this.appCase.__logs('进入');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  get modalRef() {
    return this.injector.get(NzModalRef, null);
  }

  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: PageParams,
  ) {
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
        return this.appBase.__formatModalParams(fn(record));
      };
    } else params.params = this.appBase.__formatModalParams;
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
    return this.modalSrv.static(
      comp,
      this.helpers.deepExtend(params || {}, this.appBase.__formatModalParams()),
      size,
      options,
    );
  };

  /**
   * 查询提交
   * @param st
   * @param searchData
   */
  public searchSubmit = (
    st: STComponent,
    searchData: any,
    isReload = false,
  ) => {
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
}
