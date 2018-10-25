import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders,
    LOCALE_ID,
    APP_INITIALIZER,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { StartupService } from './startup/startup.service';
import { AuthInterceptor } from './net/http.interceptor';

// 中文设置
import './i18n/zh_CN';

export function StartupServiceFactory(
    startupService: StartupService,
): Function {
    return () => startupService.load();
}

const CORE_PROVIDERS = [];

@NgModule({
    exports: [],
    providers: [],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule,
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...CORE_PROVIDERS,
                StartupService,
                {
                    provide: LOCALE_ID,
                    useValue: 'zh-Hans',
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: StartupServiceFactory,
                    deps: [StartupService],
                    multi: true,
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        };
    }
}
