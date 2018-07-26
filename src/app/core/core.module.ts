import {
  NgModule, Optional, SkipSelf, ModuleWithProviders,
  LOCALE_ID, APP_INITIALIZER
} from '@angular/core';
import { UtilsModule } from '@core/utils/utils.module';
import { DataModule } from '@core/data/data.module';
import { NetModule } from '@core/net/net.module';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { StartupService } from '@core/startup/startup.service';

// 中文设置
import '@core/i18n/zh_CN';

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...UtilsModule.forRoot().providers,
  ...NetModule.forRoot().providers,
];

@NgModule({
  exports: [DataModule, UtilsModule, NetModule],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        StartupService,
        {
          provide: APP_INITIALIZER,
          useFactory: StartupServiceFactory,
          deps: [StartupService],
          multi: true,
        },
      ]
    };
  }
}
