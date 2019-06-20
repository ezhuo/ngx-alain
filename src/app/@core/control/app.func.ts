import { AppControl } from './app.control';
import { FormGroup } from '@angular/forms';
import { SFSchema } from '@delon/form';
import { STData } from '@delon/abc';
import * as helpers from '../helpers';
import { ModalParamsFormat } from '../model';

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
  __formGroupFillData = (__frmGroup?: FormGroup, __frmData?: Object): void => {
    const self = this.appCtl;
    if (!__frmGroup === null) __frmGroup = self.form.group;
    for (const idx of Object.keys(__frmData)) {
      if (__frmGroup.controls.hasOwnProperty(idx)) {
        __frmGroup.controls[idx].setValue(__frmData[idx]);
      }
    }
  };

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
    if (!helpers.isEmpty(__frmData) && __primaryKey) {
      if (!helpers.isEmpty(__frmData.hasOwnProperty(__primaryKey))) {
        result = __frmData[__primaryKey];
      }
    }
    return result;
  };

  /**
   * 动态表单设置
   * @param mainSchema
   */
  __schemaFormSetTexts = (
    schema?: SFSchema,
    orderBy?: any[],
    mainSchema?: SFSchema,
  ) => {
    const self = this.appCtl;
    let newSchema = mainSchema || self.schemaData.edit;
    orderBy = orderBy || self.schemaData.editOrder;
    if (!helpers.isEmpty(schema)) {
      newSchema = helpers.deepExtend({}, newSchema, schema);
    }

    // 排序
    if (orderBy && !helpers.isEmpty(orderBy)) {
      newSchema = this.__schemaFormOrder(orderBy, newSchema);
    }

    const prop = newSchema.properties;
    let old = null;
    for (const idx of Object.keys(prop)) {
      if (!prop[idx]) {
        continue;
      }
      if (!prop[idx].ui || helpers.isString(prop[idx].ui)) {
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
  };

  /**
   * 字段时行设置
   */
  __schemaFormFieldsSetTexts = (
    fields: string | string[],
    schema?: SFSchema,
  ) => {
    const self = this.appCtl;
    let result: string[] = [];
    if (helpers.isString(fields)) {
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
  };

  /**
   * 表单排序
   * @param orderBy
   * @param mainSchema
   */
  __schemaFormOrder = (orderBy?: any[], mainSchema?: SFSchema): SFSchema => {
    const self = this.appCtl;
    orderBy = orderBy || self.schemaData.editOrder;
    mainSchema = mainSchema || self.schemaData.edit;
    let newSchema: SFSchema = {};
    if (orderBy && !helpers.isEmpty(orderBy)) {
      newSchema = helpers.deepExtend({}, mainSchema);
      newSchema.properties = {};
      orderBy.forEach(item => {
        newSchema.properties[item] = mainSchema.properties[item];
      });
      mainSchema = newSchema;
    } else {
      newSchema = mainSchema;
    }
    return newSchema;
  };

  // 格式化数据
  public __formatDataBySchema = (mSchema: SFSchema, frmData: any) => {
    const prop = mSchema.properties;
    let oldwidget: any = '';
    for (const idx of Object.keys(prop)) {
      if (!(prop[idx] && prop[idx].ui)) {
        continue;
      }
      if (helpers.isString(prop[idx].ui)) {
        oldwidget = prop[idx].ui;
      } else {
        oldwidget = prop[idx]['ui']['widget'];
      }
      if (
        frmData &&
        oldwidget &&
        frmData[idx] &&
        !helpers.isEmpty(frmData[idx])
      ) {
        if (oldwidget.indexOf('upload') > -1) {
          frmData[idx] = helpers.formatUploadFilesToObject(frmData[idx]);
        }
        if (oldwidget.indexOf('cascader') > -1) {
          frmData[idx] = helpers.formatCascaderToObject(frmData[idx]);
        }
      }
    }
    return frmData;
  };

  /**
   * 向模态对话框传递数据过程中的数据格式化
   * @param record
   */
  public __formatModalParams = (
    record?: STData,
    params?: any,
  ): ModalParamsFormat => {
    const self = this.appCtl;
    // 保留最原始的数据
    const srcData = record || self.form.data || {};

    // 克隆一份新数据，为新的对话框里数据处理使用
    const newFrmData = helpers.deepExtend({}, srcData);

    // 克隆一份结构
    const newSchemaData = helpers.deepExtend({}, self.schemaData);

    // 逐条数据格式化
    Object.keys(newSchemaData).forEach((value, index) => {
      if (newSchemaData[value] && newSchemaData[value]['properties'])
        this.__formatDataBySchema(newSchemaData[value], newFrmData);
    });

    return {
      // 数据源
      dataSource: {
        key: self.dataSource.key,
        url: self.dataSource.url,
        val: self.appBase.__getPrimaryKeyValue(srcData, self.dataSource.key),
      },
      // 动态表单里的新数据
      form: { data: newFrmData },
      // 动态表单结构
      schemaData: newSchemaData,
      // modal 对话框的参数设置
      modalData: helpers.deepExtend({}, self.modalData),
    };
  };

  public __formatSubmitData = (formValue: any, schema?: any): object => {
    const self = this.appCtl;
    schema = schema || self.schemaData.edit;
    formValue = formValue || {};
    const prop = schema.properties;
    let widget = null;
    for (const idx of Object.keys(formValue)) {
      if (
        formValue[idx] &&
        (helpers.isArray(formValue[idx]) || helpers.isObject(formValue[idx]))
      ) {
        if (prop && prop[idx] && prop[idx].ui) {
          if (helpers.isString(prop[idx].ui)) {
            widget = prop[idx].ui;
          } else {
            widget = prop[idx].ui.widget;
          }
          if (widget.indexOf('upload') > -1) {
            formValue[idx] = helpers.formatUploadFilesToString(formValue[idx]);
          }
          if (widget.indexOf('cascader') > -1) {
            formValue[idx] = helpers.formatCascaderToString(formValue[idx]);
          }
        }
      }
    }
    return formValue;
  };

  public __formatSubmitDataBySchema = (
    formValue: any,
    schema?: any,
  ): object => {
    const self = this.appCtl;
    formValue = this.__formatSubmitData(formValue, schema) || {};
    schema = schema || self.schemaData.edit;
    const prop = schema.properties;
    const newValue = {};
    for (const idx of Object.keys(prop)) {
      if (formValue[idx]) newValue[idx] = formValue[idx];
    }
    return newValue;
  };
}
