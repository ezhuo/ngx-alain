import { AppControl } from './app.control';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema, SFUISchema, SFSchemaEnumType } from '@delon/form';

export class AppFunc {
    private ___appCtl: AppControl = null;

    get appCtl() {
        return this.___appCtl;
    }

    constructor(appCtl: AppControl) {
        this.___appCtl = appCtl;

        this.___appCtl.modalParams = {
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
        };
    }

    /**
     * 表单初始化
     */
    __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object): void {
        const self = this.appCtl;
        if (!__frmGroup === null) __frmGroup = self.mainForm;
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
            __frmData = self.formData;
        }
        if (!__primaryKey) {
            __primaryKey = self.primaryKey;
        }
        if (!self.helpers.isEmpty(__frmData) && __primaryKey) {
            if (!self.helpers.isEmpty(__frmData.hasOwnProperty(__primaryKey))) {
                result = __frmData[__primaryKey];
                self.primaryValue = result;
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
        let newSchema = mainSchema || self.mainSchema;
        orderBy = orderBy || self.mainSchemaOrder;
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

        schema = schema || self.mainSchema;
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
        orderBy = orderBy || self.mainSchemaOrder;
        mainSchema = mainSchema || self.mainSchema;
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
