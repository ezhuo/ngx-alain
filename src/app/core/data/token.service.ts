import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NoticeService } from '@core/utils/notice.service';
import { http, menus, app_debug } from '@core/config.inc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '@core/data/users.service';
import { MenuService, SettingsService, Menu } from '@delon/theme';
import * as helper from '@core/helpers';

@Injectable()
export class TokenService {
  protected __token = '';
  protected __isAuth: Boolean = false;
  protected __local = helper.storageLocal;
  protected __session = helper.storageSession;
  protected jwtHelper: JwtHelperService = new JwtHelperService();
  protected __menu: Menu[];

  constructor(
    private noticeService: NoticeService,
    private userService: UserService,
    private menuService: MenuService,
    private settingsService: SettingsService
  ) { }

  /**
   * Returns the token value
   * @returns string
   */
  token_read() {
    if (!this.__token) {
      this.__token = this.__session.get('token');
    }
    this.__token = this.__token || '';
    this.token_assign(this.__token);
    return this.__token;
  }

  token_assign(token): Boolean {
    try {
      this.__isAuth = false;
      if (!token) {
        throw new Error('token is empty');
      }
      this.__token = token;
      if (helper.IsEmpty(this.userService.userInfo)) {
        const userInfo = this.jwtHelper.decodeToken(token);
        this.userService.userInfo = userInfo;
      }
      this.__isAuth = true;
    } catch (e) {
      //
    }
    return this.__isAuth;
  }

  token_write(token): Boolean {
    token = token || '';
    // 设置token
    if (token.length > 10 && this.token_assign(token)) {
      this.__token = token;
      this.__session.set('token', token);
    } else {
      this.token_destory();
    }
    return this.isAuth;
  }

  token_destory() {
    // 注销token
    this.isAuth = false;
    this.__token = null;
    this.userService.userInfo = null;
    this.__session.clear();
    this.__local.clear();
    this.menuService.clear();
    this.app_menu = menus;
    return true;
  }

  get isAuth() {
    this.__isAuth =
      (this.token_read() || '').length > 10 &&
      !helper.IsEmpty(this.userService.userInfo);

    if (this.__isAuth) {
      if (app_debug) console.log('isAuth');
      this.menu_reload(); // 加载菜单
    }

    return this.__isAuth;
  }

  set isAuth(bool) {
    this.__isAuth = bool;
  }

  getRequestHeaders($data: any): HttpHeaders {
    let r_data = $data || {};
    // 数据发送类型
    const style = http.style || '10';
    let validate = '';
    const token = this.token_read();
    try {
      r_data = JSON.stringify(r_data);
      validate = style + token + r_data + http.check;
      // console.log(validate);
      validate = md5(validate);
    } catch (e) {
      this.noticeService.msg_error('package build error');
      console.error(e);
    }

    return new HttpHeaders()
      .set('style', style.toString())
      .set('token', this.__token)
      .set('validate', validate);
  }

  set app_menu(_menu: Menu[]) {
    this.__menu = _menu;
    this.menuService.clear();
    this.menuService.add(_menu);
    this.menuService.resume();
  }

  get app_menu() {
    return this.__menu;
  }

  menu_reload(__menus = null) {
    let tmp = null;
    if (__menus) {
      tmp = __menus;
      this.menu_cache(__menus);
    } else {
      tmp = this.__local.get('menu');
    }
    if (tmp && helper.isString(tmp)) {
      tmp = JSON.parse(tmp);
    }
    if (tmp) {
      this.app_menu = [...menus, ...tmp];
    }
  }

  menu_cache(__menus) {
    if (__menus) {
      this.__local.set('menu', __menus);
    }
  }

}
