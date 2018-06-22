import { NoticeService } from '@core/utils/notice.service';
import { Injectable } from '@angular/core';
import { HttpService } from '../net/http.service';
import { TokenService } from './token.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private noticeService: NoticeService,
    private http: HttpService,
    protected tokenService: TokenService
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
          console.log('auth.service:', data);
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
    console.log('loginSuccess');
    const self = this;
    if (data && data.data && data.data.menu_list)
      this.tokenService.menu_reload(data.data.menu_list);

    this.http.get(`./assets/tmp/app-data.json`).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError((appData) => {
        return throwError(appData);
      })
    ).subscribe(
      (appData: any) => {
        this.tokenService.menu_reload(appData.menu);
      },
      (error: any) => {

      }
    );
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
