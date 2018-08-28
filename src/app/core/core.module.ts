import {
  NgModule, Optional, SkipSelf, ModuleWithProviders,
  LOCALE_ID, APP_INITIALIZER
} from '@angular/core';

import { UtilsModule } from './utils/utils.module';
import { DataModule } from './data/data.module';
import { NetModule } from './net/net.module';
import { CaseModule } from './case/case.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { StartupService } from './startup/startup.service';

// 中文设置
import './i18n/zh_CN';

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...UtilsModule.forRoot().providers,
  ...NetModule.forRoot().providers,
  ...CaseModule.forRoot().providers
];

@NgModule({
  exports: [DataModule, UtilsModule, NetModule, CaseModule],
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
