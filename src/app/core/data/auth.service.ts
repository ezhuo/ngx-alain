import { StateService } from '@core/data/state.service';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/net/http.service';
import { TokenService } from '@core/data/token.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import * as configInc from '@core/config.inc';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpService,
    protected tokenService: TokenService,
    protected stateSrv: StateService
  ) { }

  /**
   * @param loginData 登录
   */
  doLogin(loginData: any): Observable<any> {
    return this.http
      .post('/auth/login', {
        login_type: 'sys',
        name: loginData.account,
        password: loginData.password
      })
      .pipe(
        switchMap((data: any) => {
          if (configInc.app_debug) console.log('auth.service:', data);
          // 登录成功
          if (this.tokenService.token_write(data.data.token)) {
            this.loginSuccess(data);
          } else {
            return throwError({
              error: {
                message: '数据包不完整，请留意网络安全！'
              }
            });
          }
          return of(data);
        })
      );
  }

  /**
   * 登录成功
   */
  loginSuccess(data: any) {
    if (data && data.data && data.data.menu_list)
      this.tokenService.menu_reload(data.data.menu_list);

    // 加载菜单
    this.http.get(`./assets/tmp/app-data.json`).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError((appData) => {
        return throwError(appData);
      })
    ).subscribe(
      (appData: any) => {
        this.tokenService.menu_reload(appData.menu);
      },
      (error: any) => { }
    );

    // 加载区域数
    this.http.get(`/canton/selectTree`).subscribe((result: any) => {
      this.stateSrv.cantonList = result.data;
    });

    // 加载基础数据字典
    this.http.get(`/public/sys_dic`).subscribe((result: any) => {
      this.stateSrv.sys_dic = result.data;
    });

    this.http.get(`/public/dict_dic`).subscribe((result: any) => {
      this.stateSrv.dict_dic = result.data;
    });

  }

  /**
   * 检查权限
   */
  checkAuth(): boolean {
    if (this.tokenService.isAuth) {
      return true;
    }
    return false;
  }

  logoutAuth() {
    return this.tokenService.token_destory();
  }
}
