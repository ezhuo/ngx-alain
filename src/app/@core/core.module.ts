import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders,
    APP_INITIALIZER,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { StartupService } from './startup/startup.service';
import { HttpAuthInterceptor } from './net/http.interceptor';

// 中文设置
import {
    LANG_PROVIDES,
    I18NSERVICE_PROVIDES,
    I18NSERVICE_MODULES,
} from './i18n';

// #region Startup Service
export function StartupServiceFactory(
    startupService: StartupService,
): Function {
    return () => startupService.load();
}
const APPINIT_PROVIDES = [
    {
        provide: APP_INITIALIZER,
        useFactory: StartupServiceFactory,
        deps: [StartupService],
        multi: true,
    },
];
// #endregion

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
                ...LANG_PROVIDES,
                ...I18NSERVICE_PROVIDES,
                ...APPINIT_PROVIDES,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpAuthInterceptor,
                    multi: true,
                },
            ],
        };
    }
}
