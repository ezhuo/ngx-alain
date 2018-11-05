import { OnInit, OnDestroy, Injector } from '@angular/core';
import { STComponent } from '@delon/abc';
import { AppControl } from './app.control';

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
   * 向模态对话框传递数据过程中的数据格式化
   * @param record
   */
  formatModalParams(record?: any, params?: any): Object {
    const mSchema = this.helpers.deepExtend(
      {},
      params && params.schema ? params.schema : this.schemaData.main,
    );
    const frmData = this.helpers.deepExtend({}, record || this.form.data || {});
    const prop = mSchema.properties;
    let oldwidget = '';
    for (const idx of Object.keys(prop)) {
      if (!(prop[idx] && prop[idx].ui)) {
        continue;
      }
      if (this.helpers.isString(prop[idx].ui)) {
        oldwidget = prop[idx].ui;
      } else {
        oldwidget = prop[idx].ui.widget;
      }
      if (frmData && frmData[idx] && !this.helpers.isEmpty(frmData[idx])) {
        if (oldwidget.indexOf('upload') > -1) {
          frmData[idx] = this.helpers.formatUploadFilesToObject(frmData[idx]);
        }
        if (oldwidget.indexOf('cascader') > -1) {
          frmData[idx] = this.helpers.formatCascaderToObject(frmData[idx]);
        }
      }
    }
    const newSchemaData = Object.assign(this.schemaData, {
      main: mSchema,
      mainOrder: this.schemaData.mainOrder,
      mainUi: this.schemaData.mainUi,
    });
    return {
      dataSource: {
        key: this.dataSource.key,
        url: this.dataSource.url,
      },
      form: { data: frmData },
      schemaData: this.helpers.deepExtend({}, newSchemaData),
      modalData: this.helpers.deepExtend({}, this.modalData),
    };
  }

  /**
   * 查询提交
   * @param st
   * @param searchData
   */
  searchSubmit(st: STComponent, searchData: any) {
    // searchData = this.helpers.deepExtend({}, this.tableParams, searchData || {});
    for (const idx of Object.keys(searchData)) {
      if (this.helpers.isEmpty(searchData[idx])) {
        delete searchData[idx];
      }
    }
    return st.reset(searchData);
  }
}
