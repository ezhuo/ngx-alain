
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { StateService } from '../data/state.service';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {

    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private injector: Injector) { }


    get stateService() {
        return this.injector.get(StateService);
    }

    load(): Promise<any> {
        const self = this;
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {

            this.httpClient.get(`assets/tmp/app-data.json`).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError((appData) => {
                    resolve(null);
                    return appData;
                })
            ).subscribe(app, error, complete);

            function app(appData: any = {}) {
                // application data
                const res: any = appData.app || self.stateService.config.app;
                // 应用信息：包括站点名、描述、年份
                self.settingService.setApp(res);
                // 设置页面标题的后缀
                self.titleService.suffix = res.name;

                // 初始化菜单
                self.menuService.clear();
                self.menuService.add(self.stateService.config.menus);
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
