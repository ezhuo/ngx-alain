import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SettingsService, TitleService } from '@delon/theme';
import { ConfigService, TokenService, StateService } from '../data';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable({
    providedIn: 'root',
})
export class StartupService {
    constructor(private injector: Injector) {}

    get settingService() {
        return this.injector.get(SettingsService);
    }

    get titleService() {
        return this.injector.get(TitleService);
    }

    get httpClient() {
        return this.injector.get(HttpClient);
    }

    get configSrv() {
        return this.injector.get(ConfigService);
    }

    get tokenSrv() {
        return this.injector.get(TokenService);
    }

    get stateSrv() {
        return this.injector.get(StateService);
    }

    load(): Promise<any> {
        const self = this;
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(`assets/data/app.json`)
                .pipe(
                    // 接收其他拦截器后产生的异常消息
                    catchError(appData => {
                        resolve(null);
                        return appData;
                    }),
                )
                .subscribe(app, error, complete);

            function app(appData: any = {}) {
                // application data
                const res: any = appData.app || self.configSrv.app;
                // 应用信息：包括站点名、描述、年份
                self.settingService.setApp(res);
                // 设置页面标题的后缀
                self.titleService.suffix = res.name;
                if (res.name != self.configSrv.app.name) {
                    self.configSrv.app.name = res.name;
                    self.configSrv.app.short = res.short;
                    self.configSrv.app.description = res.description;
                }

                // 初始化菜单
                self.tokenSrv.appMenuBase = appData.menu;
            }

            function error(err) {
                return app();
            }

            function complete() {
                resolve(null);
            }
        });
    }
}
