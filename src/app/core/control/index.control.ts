import { OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseControl } from './base.control';

export class ParentIndexControl extends BaseControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector) { super(injector); }

  ngOnInit() {
    super.ngOnInit();
    this.caseSrv.__logs('进入');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected __init(url: string, key: any, params?: any) {
    return super.__init(url, key, params);
  }

  formatModalParams(record?: any) {
    const mSchema = this.helpers.deepExtend({}, this.mainSchema);
    const frmData = this.helpers.deepExtend({}, record || this.formData || {});
    const prop = mSchema.properties;

    // 将数据格式化后，传入到modal中
    let tmp = '';
    for (const idx of Object.keys(prop)) {
      if (!(prop[idx] && prop[idx].ui)) {
        continue;
      }
      if (this.helpers.isString(prop[idx].ui)) {
        tmp = prop[idx].ui;
      } else {
        tmp = prop[idx].ui.widget;
      }
      if (['upload', 'uploadAvatar'].indexOf(tmp) > -1) {
        if (frmData && frmData[idx] && this.helpers.isString(frmData[idx]) && !this.helpers.IsEmpty(frmData[idx])) {
          frmData[idx] = this.helpers.formatUploadFilesToObject(frmData[idx]);
        }
      }
    }
    return {
      primaryKey: this.primaryKey,
      primaryURL: this.primaryURL,
      formData: frmData,
      mainSchema: mSchema,
      mainSchemaOrder: this.helpers.deepExtend({}, this.mainSchemaOrder),
      mainSchemaUi: this.helpers.deepExtend({}, this.mainSchemaUi),
    };
  }

}
