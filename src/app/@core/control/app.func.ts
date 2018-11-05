import { AppControl } from './app.control';
import { FormGroup } from '@angular/forms';
import { SFSchema } from '@delon/form';

export class AppFunc {
  private ___appCtl: AppControl = null;

  get appCtl() {
    return this.___appCtl;
  }

  constructor(appCtl: AppControl) {
    this.___appCtl = appCtl;
  }

  /**
   * 表单初始化
   */
  __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object): void {
    const self = this.appCtl;
    if (!__frmGroup === null) __frmGroup = self.form.group;
    for (const idx of Object.keys(__frmData)) {
      if (__frmGroup.controls.hasOwnProperty(idx)) {
        __frmGroup.controls[idx].setValue(__frmData[idx]);
      }
    }
  }

  /**
   * 获取主键值
   */
  __getPrimaryKeyValue = (__frmData?: any, __primaryKey?: string) => {
    const self = this.appCtl;
    let result = null;
    if (!__frmData) {
      __frmData = self.form.data;
    }
    if (!__primaryKey) {
      __primaryKey = self.dataSource.key;
    }
    if (!self.helpers.isEmpty(__frmData) && __primaryKey) {
      if (!self.helpers.isEmpty(__frmData.hasOwnProperty(__primaryKey))) {
        result = __frmData[__primaryKey];
        self.dataSource.key = result;
      }
    }
    return result;
  };

  /**
   * 动态表单设置
   * @param mainSchema
   */
  __schemaFormSetTexts(
    schema?: SFSchema,
    orderBy?: any[],
    mainSchema?: SFSchema,
  ) {
    const self = this.appCtl;
    let newSchema = mainSchema || self.schemaData.edit;
    orderBy = orderBy || self.schemaData.editOrder;
    if (!self.helpers.isEmpty(schema)) {
      newSchema = self.helpers.deepExtend({}, newSchema, schema);
    }

    // 排序
    if (orderBy && !self.helpers.isEmpty(orderBy)) {
      newSchema = this.__schemaFormOrder(orderBy, newSchema);
    }

    const prop = newSchema.properties;
    let old = null;
    for (const idx of Object.keys(prop)) {
      if (!prop[idx]) {
        continue;
      }
      if (!prop[idx].ui || self.helpers.isString(prop[idx].ui)) {
        old = prop[idx].ui;
        prop[idx].ui = {};
      } else {
        prop[idx].ui = prop[idx].ui || {};
        old = prop[idx].ui['widget'];
      }
      prop[idx].ui['widget'] = 'texts';
      if (old) {
        prop[idx].ui['options'] = prop[idx].ui['options'] || {};
        prop[idx].ui['options']['oldwidget'] = old;
      }
      if (!prop[idx].ui['enum'] && prop[idx].enum) {
        prop[idx].ui['enum'] = prop[idx].enum;
      }
    }

    return newSchema;
  }

  /**
   * 字段时行设置
   */
  __schemaFormFieldsSetTexts(fields: string | string[], schema?: SFSchema) {
    const self = this.appCtl;
    let result: string[] = [];
    if (this.appCtl.helpers.isString(fields)) {
      result.push(<string>fields);
    } else {
      result = [].concat(fields);
    }

    schema = schema || self.schemaData.edit;
    result.forEach(item => {
      if (schema.properties[item]) {
        schema.properties[item]['ui']['widget'] = 'texts';
      }
    });
  }

  /**
   * 表单排序
   * @param orderBy
   * @param mainSchema
   */
  __schemaFormOrder(orderBy?: any[], mainSchema?: SFSchema): SFSchema {
    const self = this.appCtl;
    orderBy = orderBy || self.schemaData.editOrder;
    mainSchema = mainSchema || self.schemaData.edit;
    let newSchema: SFSchema = {};
    if (orderBy && !self.helpers.isEmpty(orderBy)) {
      newSchema = self.helpers.deepExtend({}, mainSchema);
      newSchema.properties = {};
      orderBy.forEach(item => {
        newSchema.properties[item] = mainSchema.properties[item];
      });
      mainSchema = newSchema;
    } else {
      newSchema = mainSchema;
    }
    return newSchema;
  }
}
