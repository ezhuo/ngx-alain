import { Injectable, Injector } from '@angular/core';
import { HttpService } from '@core/net/http.service';
import { ConfigService } from '@core/data/config.service';
import * as helpers from '@core/helpers';

@Injectable()
export class StateService {
  constructor(private injector: Injector) { }

  get httpLoading() {
    return this.injector.get(HttpService).loading;
  }

  get configSrv() {
    return this.injector.get(ConfigService);
  }

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

  private __sys_dic = {};
  get sys_dic() {
    if (helpers.IsEmpty(this.__sys_dic)) {
      try {
        const tmpDB = helpers.storageLocal.get('sys_dic');
        if (tmpDB) {
          this.__sys_dic = JSON.parse(tmpDB);
        }
      } catch (e) {
        console.error('sys_dic', e);
      }
    }
    return this.__sys_dic;
  }

  set sys_dic(value) {
    this.__sys_dic = value;
    helpers.storageLocal.set('sys_dic', value);
  }

  private __dict_dic = {};
  get dict_dic() {
    if (helpers.IsEmpty(this.__dict_dic)) {
      try {
        const tmpDB = helpers.storageLocal.get('dict_dic');
        if (tmpDB) {
          this.__dict_dic = JSON.parse(tmpDB);
        }
      } catch (e) {
        console.error('dict_dic', e);
      }
    }
    return this.__dict_dic;
  }

  set dict_dic(value) {
    this.__dict_dic = value;
    helpers.storageLocal.set('dict_dic', value);
  }

}
