import { BaseComponent } from './base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';

import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema, SFUISchema, SFSchemaEnumType } from '@delon/form';

export class BaseFunc {

    private ___bc: BaseComponent = null;

    get bc() {
        return this.___bc;
    }

    constructor(bc: BaseComponent) {
        this.___bc = bc;
    }

    /**
     * 释放
     */
    destroy() {
        const self = this.___bc;

        console.log('ngOnDestroy', self.pageData$);

        // 清空数据流
        for (const idx of Object.keys(self.pageData$)) {
            if (self.pageData$[idx] instanceof Subscriber) {
                if (self.pageData$[idx].unsubscribe) {
                    self.pageData$[idx].unsubscribe();
                }
            }
            if (self.pageData$[idx] instanceof Promise) {
                // console.log('Promise');
            }
            self.pageData$[idx] = null;
        }

        // 清空定时器timeout
        for (const idx of Object.keys(self.pageTimeOut)) {
            if (self.pageTimeOut[idx]) {
                clearTimeout(self.pageTimeOut[idx]);
            }
            self.pageTimeOut[idx] = null;
        }

        // 清空定时器timeinterval
        for (const idx of Object.keys(self.pageTimeInterval)) {
            if (self.pageTimeInterval[idx]) {
                clearInterval(self.pageTimeInterval[idx]);
            }
            self.pageTimeInterval[idx] = null;
        }
    }

    /**
   * 表单初始化
   */
    __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object, ): void {
        const self = this.bc;
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
        const self = this.bc;
        let result = null;
        if (!__frmData) {
            __frmData = self.formData;
        }
        if (!__primaryKey) {
            __primaryKey = self.primaryKey;
        }
        if (!self.helpers.IsEmpty(__frmData) && __primaryKey) {
            if (!self.helpers.IsEmpty(__frmData.hasOwnProperty(__primaryKey))) {
                result = __frmData[__primaryKey];
                self.primaryValue = result;
            }
        }
        return result;
    }

    /**
     * 动态表单设置
     * @param mainSchema 
     */
    __schemaFormSetTexts(schema?: SFSchema) {
        const self = this.bc;
        if (!self.helpers.IsEmpty(schema)) {
            self.mainSchema = self.helpers.deepExtend({}, self.mainSchema, schema);
        }

        const prop = self.mainSchema.properties;
        for (const idx of Object.keys(prop)) {
            if (!prop[idx].ui || self.helpers.isString(prop[idx].ui)) {
                prop[idx].ui = { widget: 'texts' };
            } else {
                prop[idx].ui['widget'] = 'texts';
            }
            if (!prop[idx].ui['enum']) {
                prop[idx].ui['enum'] = prop[idx].enum;
            }
        }
    }

}
