import { BaseControl } from './base.control';
import { of } from 'rxjs';

import { SimpleTableComponent } from '@delon/abc';


export class BaseCase {

    private ___bc: BaseControl = null;

    get bc() {
        return this.___bc;
    }

    constructor(bc: BaseControl) {
        this.___bc = bc;
    }

    /**
    * 写日志
    */
    __logs = (content: string) => {
        const bc = this.bc;
        bc.pageData$.logs = bc.httpSrv.post('/logs', {
            title: bc.titleSrv.getTitle(),
            content: content
        }).toPromise().then((res) => {
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * 根据表格，数据导出到EXCEL
     */
    exportXlsFromSt = (__st: SimpleTableComponent, __url?: string, __tableParams?: any, __body?: any, __options?: any) => {

        const self = this.bc;
        __url = __url || self.primaryURL;
        __body = __body || {};
        __tableParams = __tableParams || self.mainTableParams;
        const pi = __tableParams.pi;
        const ps = __tableParams.ps;
        __options = __options || { filename: (self.titleSrv.getTitle() || '数据导出') + '.xlsx', sheetname: '数据导出' };
        if (!__st) {
            return self.noticeSrv.notice_error('导出无效！');
        }
        __tableParams.pi = 1;
        __tableParams.ps = 10000;
        __st.export(__url + self.helpers.jsonToURL(__body), __options);
        self.pageTimeOut.to = setTimeout(() => {
            __tableParams.pi = pi;
            __tableParams.ps = ps;
        }, 0);
    }


    /**
     * 根据服务器端，数据导出到EXCEL
     */
    exportXlsFromServer = (__url?: string, __body?: any, __options?: any) => {
        const self = this.bc;
        __url = __url || self.primaryURL;
        __body = __body || {};
        __options = __options || { filename: (self.titleSrv.getTitle() || '数据导出'), sheetname: '数据导出' };

        __url += '/exports';

        // 配置导出数据
        __body.export_file = encodeURI(__body.export_file || '数据导出');
        __body.export_title = encodeURI(__body.export_title || '数据列表');
        if (__body.export_file.indexOf('.') < 1) {
            __body.export_file += '.xlsx';
        }
        let ext = __body.export_file.split('.');
        if (ext.length > 0) {
            ext = ext[ext.length - 1];
        }

        // 配置API ----------------------------
        const header = self.tokenSrv.getRequestHeaders({});
        __url += '/' + 0 + '/' + header.get('style') + '/' + header.get('token') + '/' + header.get('validate');
        const link = document.createElement('a');
        if (['pdf'].indexOf(ext) == -1) {
            link.download = __body.export_file + '.' + ext;
        }
        link.target = '_blank';
        link.href = self.configSrv.api.base + __url + self.helpers.jsonToURL(__body);
        document.body.appendChild(link);
        console.log(link.href, header.get('validate'));
        link.click();
        return document.body.removeChild(link);
    }

    /**
     * 数据上传
     */
    nzUploadHandleChange = ($event: any): void => {
        const self = this.bc;
        const file = $event.file;
        const fileList = $event.fileList;
        const status = file.status;
        if (status !== 'uploading') {
            // 正在上传
        }
        if (status === 'done') {
            // 上传完成
            file.response.url = self.configSrv.api.show + file.response.url;
            fileList[fileList.length - 1].thumbUrl = file.response.url;
            fileList[fileList.length - 1].url = file.response.url;
            // console.log(file, fileList);
            self.msgSrv.msg_success(`${file.name} 上传成功！`);
        } else if (status === 'error') {
            // 上传失败
            // console.log(file, fileList);
            self.msgSrv.msg_error(`${file.name} 上传失败！`);
        }
    }

    /**
     * 地区加载数据
     */
    nzCascaderLoadData = (node: any, index: number): PromiseLike<any> => {
        const self = this.bc;
        return new Promise((resolve) => {
            const arrCanton = self.stateSrv.cantonList;
            if (index < 0 && arrCanton.length > 0) {
                node.children = arrCanton;
                resolve(true);
                return;
            }
            return self.httpSrv.get('/canton/selectTree', { fdn: node.value || '' }).subscribe((appdata: any) => {
                appdata.data = appdata.data || [];
                if (appdata.data.length > 0) node.children = appdata.data;
                resolve(true);
            }, (err) => {
            });
        });
    }

    /**
     * 动态表单中的地区加载数据
     */
    nzCascaderLoadDataBySchema = (node?: any): any => {
        const self = this.bc;
        if (!node) {
            const arrCanton = self.stateSrv.cantonList;
            if (arrCanton.length > 0) {
                return of(arrCanton);
            } else {
                return of([]);
            }
        }
        return this.nzCascaderLoadData(node, 0);
    }

    /**
    * 删除对话框
    */
    deleteAlert = (__mainUrl?: string, __record?: Object, __primaryKey?: string): any => {
        const self = this.bc;
        return new Promise((resolve, reject?: any) => {
            if (!__mainUrl) { __mainUrl = self.primaryURL; }
            if (!__record) { __record = self.formData; }
            if (!__primaryKey) __primaryKey = self.primaryKey;
            const __id = self.baseFunc.__getPrimaryKeyValue(__record, __primaryKey);
            if (!__id) {
                self.noticeSrv.notice_warning('删除无效！');
                reject(false);
            } else {
                self.sweetSrv.confirmWait('确定要删除当前数据吗？', (res) => {
                    if (res) {
                        return self.pageData$.httpDelAlert = self.httpSrv.deleteById(__mainUrl, __id).toPromise();
                    } else {
                        return reject(false);
                    }
                }).then((res) => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }

}
