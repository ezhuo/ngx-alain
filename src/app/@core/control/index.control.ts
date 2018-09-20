import { OnInit, OnDestroy, Injector } from '@angular/core';
import { SimpleTableComponent } from '@delon/abc';
import { AppControl } from './app.control';

export class IndexControl extends AppControl
    implements OnInit, OnDestroy {
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
     * 模态数据格式化
     * @param record
     */
    formatModalParams(record?: any, params?: any): Object {
        const mSchema = this.helpers.deepExtend(
            {},
            params && params.schema ? params.schema : this.mainSchema,
        );
        const frmData = this.helpers.deepExtend(
            {},
            record || this.formData || {},
        );
        const prop = mSchema.properties;
        // console.log(record);
        // 将数据格式化后，传入到modal中
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
            if (
                frmData &&
                frmData[idx] &&
                !this.helpers.isEmpty(frmData[idx])
            ) {
                if (oldwidget.indexOf('upload') > -1) {
                    frmData[idx] = this.helpers.formatUploadFilesToObject(
                        frmData[idx],
                    );
                }
                if (oldwidget.indexOf('cascader') > -1) {
                    frmData[idx] = this.helpers.formatCascaderToObject(
                        frmData[idx],
                    );
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
            modalParams: this.helpers.deepExtend({}, this.modalParams),
        };
    }

    /**
     * 查询提交
     * @param st
     * @param searchData
     */
    searchSubmit(st: SimpleTableComponent, searchData) {
        // searchData = this.helpers.deepExtend({}, this.mainTableParams, searchData || {});
        for (const idx of Object.keys(searchData)) {
            if (this.helpers.isEmpty(searchData[idx])) {
                delete searchData[idx];
            }
        }
        return st.reset(searchData);
    }
}
