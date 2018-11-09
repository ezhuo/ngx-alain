import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService, Menu } from '@delon/theme';
import { NoticeService } from '../utils';
import { HttpService } from '../net/http.service';
import { http, appDebug } from '../config.inc';
import { UserService } from './users.service';
import * as helper from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  protected __token = '';
  protected __isAuth: Boolean = false;
  protected __local = helper.storageLocal;
  protected __session = helper.storageSession;
  protected __jwtHelper: JwtHelperService = new JwtHelperService();
  protected __menu: Object;
  protected __menuBase: Menu[];

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get userSrv() {
    return this.injector.get(UserService);
  }

  get menuSrv() {
    return this.injector.get(MenuService);
  }

  get httpSrv() {
    return this.injector.get(HttpService);
  }

  constructor(private injector: Injector) {}

  /**
   * Returns the token value
   * @returns string
   */
  tokenRead() {
    if (!this.__token) {
      this.__token = this.__session.get('token');
    }
    this.__token = this.__token || '';
    this.tokenAssign(this.__token);
    return this.__token;
  }

  tokenAssign(token): Boolean {
    try {
      this.__isAuth = false;
      if (!token) {
        throw new Error('token is empty');
      }
      this.__token = token;
      if (helper.isEmpty(this.userSrv.userInfo)) {
        const userInfo = this.__jwtHelper.decodeToken(token);
        this.userSrv.userInfo = userInfo;
      }
      this.__isAuth = true;
    } catch (e) {
      //
    }
    return this.__isAuth;
  }

  tokenWrite(token): Boolean {
    token = token || '';
    // 设置token
    if (token.length > 10 && this.tokenAssign(token)) {
      this.__token = token;
      this.__session.set('token', token);
    } else {
      this.tokenDestory();
    }
    return this.isAuth;
  }

  tokenDestory() {
    const tokendes = res => {
      // 注销token
      this.isAuth = false;
      this.__token = null;
      this.userSrv.userInfo = null;
      this.__session.clear();
      this.__local.clear();
      this.menuSrv.clear();
    };
    // 发出注销请求
    return this.httpSrv.post('/auth/logout').subscribe(tokendes, tokendes);
  }

  get isAuth() {
    this.__isAuth =
      (this.tokenRead() || '').length > 10 &&
      !helper.isEmpty(this.userSrv.userInfo);
    if (appDebug) console.log('isAuth', this.__isAuth);
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
    const token = this.tokenRead();
    try {
      r_data = JSON.stringify(r_data);
      validate = style + token + r_data + http.check;
      // console.log(validate);
      validate = md5(validate);
    } catch (e) {
      this.noticeSrv.msgError('package build error');
      console.error(e);
    }

    return new HttpHeaders()
      .set('style', style.toString())
      .set('token', this.__token)
      .set('validate', validate);
  }

  set appMenu(_menu: Object) {
    this.__menu = _menu;
  }

  get appMenu() {
    return this.__menu;
  }

  set appMenuBase(_menu: Menu[]) {
    this.__menuBase = _menu;
  }

  menuReload(__menus = null) {
    let tmp = null;
    if (__menus) {
      tmp = __menus;
      this.menuCache(__menus);
    } else {
      tmp = this.__local.get('menu');
    }
    if (tmp && helper.isString(tmp)) {
      tmp = JSON.parse(tmp);
    }
    if (tmp) {
      this.appMenu = tmp;
    }

    this.menuResume();
  }

  menuCache(__menus) {
    if (__menus) {
      this.__local.set('menu', __menus);
    }
  }

  /**
   * 重新刷新菜单
   */
  menuResume() {
    const _menu = helper.deepExtend([], this.__menuBase || []);
    if (_menu.length >= 3) {
      _menu[1].children = _menu[1].children || [];
      menuAdd(_menu[1].children, this.__menu['case'] || []);

      _menu[2].children = _menu[2].children || [];
      menuAdd(_menu[2].children, this.__menu['sys'] || []);
    }
    this.menuSrv.clear();
    this.menuSrv.add(_menu);
    this.menuSrv.resume();

    function menuAdd(target: Array<any>, src: Array<any>) {
      src.forEach(item => {
        target.push(item);
      });
    }
  }
}
