import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { StateService } from './state.service';
import { HttpService } from '../net/http.service';
import * as configInc from '../config.inc';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpService,
        protected tokenSrv: TokenService,
        protected stateSrv: StateService,
    ) {}

    /**
     * @param loginData 登录
     */
    doLogin(loginData: any): Observable<any> {
        return this.http
            .post('/auth/login', {
                login_type: 'sys',
                name: loginData.account,
                password: loginData.password,
                captcha: Object.assign(
                    { value: loginData.captcha },
                    loginData.captchaParams,
                ),
            })
            .pipe(
                switchMap((data: any) => {
                    if (configInc.app_debug) console.log('auth.service:', data);
                    // 登录成功
                    if (this.tokenSrv.tokenWrite(data.data.token)) {
                        this.loginSuccess(data);
                    } else {
                        return throwError({
                            error: {
                                message: '数据包不完整，请留意网络安全！',
                            },
                        });
                    }
                    return of(data);
                }),
            );
    }

    /**
     * 登录成功
     */
    loginSuccess(data: any) {
        // 缓存菜单
        if (data && data.data && data.data.menu_list)
            this.tokenSrv.menuCache(data.data.menu_list);

        this.stateSrv.loadCantonData();

        // 加载数据字典数据
        this.stateSrv.loadDicData();
    }

    /**
     * 检查权限
     */
    checkAuth(): boolean {
        if (this.tokenSrv.isAuth) {
            return true;
        }
        return false;
    }

    logoutAuth() {
        return this.tokenSrv.tokenDestory();
    }
}
