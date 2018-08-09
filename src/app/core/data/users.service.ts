import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, SettingsService } from '@delon/theme';

import { define, app_debug } from '../config.inc';
import * as helper from '../helpers';

@Injectable()
export class UserService {
  private __api_dt: any = null;
  private __userInfo: any = {};
  private __user: User = {};

  constructor(private settingsService: SettingsService) { }

  getUser(): Observable<any> {
    return of(this.__userInfo);
  }

  set userInfo(dd: any) {
    this.__userInfo = dd;
    if (dd) {
      const pic = helper.parseJSON(dd.images) || [];
      if (pic && pic.length > 1000) {
        this.__userInfo.avatar = pic[0].path;
      } else {
        this.__userInfo.avatar = define.user_images;
      }

      this.__user.name = this.__userInfo.true_name;
      this.__user.avatar = this.__userInfo.avatar;
      this.__user.email = this.__userInfo.email || '';
      this.__user.key = this.__userInfo.id;
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingsService.setUser(this.__user);
    }
    if (app_debug) console.log(this.__userInfo);
  }

  get userInfo() {
    return this.__userInfo;
  }

  get user() {
    return this.__user;
  }

  set apiDt(dd: any) {
    this.__api_dt = dd;
  }

  get apiDt() {
    return this.__api_dt;
  }
}
