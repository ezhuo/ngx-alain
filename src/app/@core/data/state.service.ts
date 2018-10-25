import { Injectable, Injector } from '@angular/core';
import { Subscriber } from 'rxjs';
import { HttpService } from '../net/http.service';
import { ConfigService } from '../data/config.service';

import { ArrayService } from '@delon/util';

import * as helpers from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    constructor(private injector: Injector) {}

    get httpSrv() {
        return this.injector.get(HttpService);
    }

    get httpLoading() {
        return this.httpSrv.loading;
    }

    set httpLoading(value: boolean) {
        this.httpSrv.loading = value;
    }

    get configSrv() {
        return this.injector.get(ConfigService);
    }

    get arraySrv() {
        return this.injector.get(ArrayService);
    }

    /**
     * 加载区域数据
     */
    loadCantonData() {
        this.httpSrv.post(`/public/cantonTree`).subscribe((result: any) => {
            this.cantonList = result.data;
        });
    }

    /**
     * 加载数据字典数据
     */
    loadDicData() {
        this.httpSrv.get(`/public/sys_dic`).subscribe((result: any) => {
            this.sysDic = result.data;
        });

        this.httpSrv.get(`/public/dict_dic`).subscribe((result: any) => {
            this.dictDic = result.data;
        });
    }

    /**
     * 区域数据
     */
    private __cantonList = [];
    get cantonList() {
        if (this.__cantonList.length < 1) {
            try {
                const tmpDB = helpers.storageLocal.get('canton');
                if (tmpDB) {
                    this.__cantonList = JSON.parse(tmpDB);
                }
            } catch (e) {
                console.error('cantonList', e);
            }
        }
        return this.__cantonList;
    }

    set cantonList(value) {
        this.__cantonList = value;
        helpers.storageLocal.set('canton', value);
    }

    /**
     * 系统的数据字典
     */
    private __sysDic = {};
    get sysDic() {
        if (helpers.isEmpty(this.__sysDic)) {
            try {
                const tmpDB = helpers.storageLocal.get('sys_dic');
                if (tmpDB) {
                    this.__sysDic = JSON.parse(tmpDB);
                }
            } catch (e) {
                console.error('sys_dic', e);
            }
        }
        return this.__sysDic;
    }

    set sysDic(value) {
        this.__sysDic = value;
        helpers.storageLocal.set('sys_dic', value);
    }

    get sysDicDic(): any[] {
        const arr = this.sysDic;
        if (!helpers.isEmpty(arr)) {
            return arr['sys_dic'];
        }
        return [];
    }

    get sysDicSetting(): any[] {
        const arr = this.sysDic;
        if (!helpers.isEmpty(arr)) {
            return arr['sys_setting'];
        }
        return [];
    }

    /**
     * 在数组的头部，增加元素
     * @param node
     * @param item
     */
    sysDicDicUnshift(node: string, item: object): any {
        const result = (this.sysDicDic[node] || []).slice(0); // 复制数组
        result.unshift(item);
        if (this.configSrv.app_debug)
            console.log('sysDicDicUnshift:' + node, result);
        return result;
    }

    /**
     * 将数据字典中的value格式化为number类型
     * @param node
     * @param item
     */
    sysDicDicFormatNumber(node: string, item?: object): any {
        const result = (this.sysDicDic[node] || []).slice(0); // 复制数组
        if (item) result.unshift(item);
        for (const idx of result) {
            idx.value = parseFloat(idx.value);
        }
        if (this.configSrv.app_debug)
            console.log('sysDicDicFormatNumber:' + node, result);
        return result;
    }

    /**
     * 获取sys_dic数据字典的值
     * @param node
     * @param value
     */
    getSysDicDicLabel(node: string, value: string): any {
        return helpers.getDict(this.sysDicDic[node], value);
    }

    /**
     * 用户的自定义的数据字典
     */
    private __dictDic = {};
    get dictDic() {
        if (helpers.isEmpty(this.__dictDic)) {
            try {
                const tmpDB = helpers.storageLocal.get('dict_dic');
                if (tmpDB) {
                    this.__dictDic = JSON.parse(tmpDB);
                }
            } catch (e) {
                console.error('dict_dic', e);
            }
        }
        return this.__dictDic;
    }

    set dictDic(value) {
        this.__dictDic = value;
        helpers.storageLocal.set('dict_dic', value);
    }

    /**
     * 释放
     */
    destroy(self: object, keys: any[] | any) {
        for (const field of keys) {
            if (!self[field]) {
                continue;
            }
            if (this.configSrv.app_debug) console.log('Destroy', self[field]);

            for (const idx of Object.keys(self[field])) {
                // 清空数据流
                if (self[field][idx] instanceof Subscriber) {
                    if (self[field][idx].unsubscribe) {
                        self[field][idx].unsubscribe();
                    }
                }

                // 清空promise
                if (self[field][idx] instanceof Promise) {
                    // console.log('Promise');
                }

                // 清空定时器timeout
                if ((field + '').indexOf('TimeOut') > -1) {
                    if (self[field][idx]) {
                        clearTimeout(self[field][idx]);
                    }
                }

                // 清空定时器timeinterval
                if ((field + '').indexOf('TimeInterval') > -1) {
                    if (self[field][idx]) {
                        clearInterval(self[field][idx]);
                    }
                }
                self[field][idx] = null;
            }
        }
    }
}
