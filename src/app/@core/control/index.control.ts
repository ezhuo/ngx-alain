import { OnInit, OnDestroy, Injector } from '@angular/core';
import { STComponent, STColumnButtonModal, STData } from '@delon/abc';
import { AppControl } from './app.control';
import { SFSchema } from '@delon/form';
import { ModalOptionsForService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

export class IndexControl extends AppControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    // 只有后台才允许记录操作日志
    if ((this.route.url + '').indexOf('/admin/') > -1) {
      this.appCase.__logs('进入');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
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
    params.params = this.appBase.__formatModalParams;
    params.modalOptions = this.helpers.deepExtend(options || {}, {
      nzStyle: { top: '20px' },
    });
    return params;
  };

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
  public searchSubmit = (st: STComponent, searchData: any) => {
    // searchData = this.helpers.deepExtend({}, this.tableParams, searchData || {});
    for (const idx of Object.keys(searchData)) {
      if (this.helpers.isEmpty(searchData[idx])) {
        delete searchData[idx];
      }
    }
    return st.reset(searchData);
  };
}
