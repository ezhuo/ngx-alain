import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DelonMockConfig } from '@delon/mock/mock.config';
import { MockService } from '@delon/mock/src/mock.service';
import { MockInterceptor } from '@delon/mock/src/mock.interceptor';

@NgModule({})
export class DelonMockModule {
  static forRoot(config: DelonMockConfig): ModuleWithProviders {
    return {
      ngModule: DelonMockModule,
      providers: [
        MockService,
        { provide: DelonMockConfig, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }
}
