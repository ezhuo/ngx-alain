import { OnInit, OnDestroy, Injector } from '@angular/core';
import { InjectorControl } from './injector.control';
import { DataSource, PageParams, ModalParamsFormat } from '../model';
import { FormGroup } from '@angular/forms';
import { STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import * as helpers from '../helpers';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
  // --------------------------------------

  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    // 清空其它的
    for (const idx of Object.keys(this)) {
      if (idx && idx.indexOf('___') > -1) {
        this[idx] = null;
      }
    }
  }

  // ----------------------------------------

  /**
   * 初始化
   */
  protected __init__(child: Object | Function, dataSource?: DataSource, params?: PageParams): void {
    if (!this.helpers.isEmpty(dataSource)) {
      this.dataSource = Object.assign(this.dataSource, dataSource);
    }
    return super.__init__(child, dataSource, params);
  }

  // -------------------------

  /**
   * 表单初始化
   */
  protected __formGroupFillData = (__frmGroup?: FormGroup, __frmData?: Object): void => {
    if (!__frmGroup === null) __frmGroup = this.form.group;
    for (const idx of Object.keys(__frmData)) {
      if (__frmGroup.controls.hasOwnProperty(idx)) {
        __frmGroup.controls[idx].setValue(__frmData[idx]);
      }
    }
  };

  /**
   * 获取主键值
   */
  protected __getPrimaryKeyValue = (__frmData?: any, __primaryKey?: string) => {
    let result = null;
    if (!__frmData) {
      __frmData = this.form.data;
    }
    if (!__primaryKey) {
      __primaryKey = this.dataSource.key;
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
  protected __schemaFormSetTexts = (schema?: SFSchema, orderBy?: any[], mainSchema?: SFSchema) => {
    let newSchema = mainSchema || this.schemaData.edit;
    orderBy = orderBy || this.schemaData.editOrder;
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
  protected __schemaFormFieldsSetTexts = (fields: string | string[], schema?: SFSchema) => {
    let result: string[] = [];
    if (helpers.isString(fields)) {
      result.push(<string>fields);
    } else {
      result = [].concat(fields);
    }

    schema = schema || this.schemaData.edit;
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
  protected __schemaFormOrder = (orderBy?: any[], mainSchema?: SFSchema): SFSchema => {
    orderBy = orderBy || this.schemaData.editOrder;
    mainSchema = mainSchema || this.schemaData.edit;
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
  protected __formatDataBySchema = (mSchema: SFSchema, frmData: any) => {
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
      if (frmData && oldwidget && frmData[idx] && !helpers.isEmpty(frmData[idx])) {
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
  protected __formatModalParams = (record?: STData, params?: any): ModalParamsFormat => {
    // 保留最原始的数据
    const srcData = record || this.form.data || {};

    // 克隆一份新数据，为新的对话框里数据处理使用
    const newFrmData = helpers.deepExtend({}, srcData);

    // 克隆一份结构
    const newSchemaData = helpers.deepExtend({}, this.schemaData);

    // 逐条数据格式化
    Object.keys(newSchemaData).forEach((value, index) => {
      if (newSchemaData[value] && newSchemaData[value]['properties'])
        this.__formatDataBySchema(newSchemaData[value], newFrmData);
    });

    return {
      // 数据源
      dataSource: {
        key: this.dataSource.key,
        url: this.dataSource.url,
        val: this.__getPrimaryKeyValue(srcData, this.dataSource.key),
      },
      // 动态表单里的新数据
      form: { data: newFrmData },
      // 动态表单结构
      schemaData: newSchemaData,
      // modal 对话框的参数设置
      modalData: helpers.deepExtend({}, this.modalData),
    };
  };

  protected __formatSubmitData = (formValue: any, schema?: any): object => {
    schema = schema || this.schemaData.edit;
    formValue = formValue || {};
    const prop = schema.properties;
    let widget = null;
    for (const idx of Object.keys(formValue)) {
      if (formValue[idx] && (helpers.isArray(formValue[idx]) || helpers.isObject(formValue[idx]))) {
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

  protected __formatSubmitDataBySchema = (formValue: any, schema?: any): object => {
    formValue = this.__formatSubmitData(formValue, schema) || {};
    schema = schema || this.schemaData.edit;
    const prop = schema.properties;
    const newValue = {};
    for (const idx of Object.keys(prop)) {
      if (formValue[idx]) newValue[idx] = formValue[idx];
    }
    return newValue;
  };

  // -------------------------------
  /**
   * 写日志
   */
  protected __commonLogs = (content: string) => {
    const bc = this;
    bc.freeData.logs = bc.httpSrv
      .post('/logs', {
        title: bc.titleSrv.getTitle(),
        content: content,
      })
      .toPromise()
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
}
