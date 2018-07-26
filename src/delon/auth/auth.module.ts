import { NgModule, ModuleWithProviders } from '@angular/core';

import { DelonAuthConfig } from '@delon/auth/auth.config';
import { DA_STORE_TOKEN } from '@delon/auth/store/interface';
import { DA_SERVICE_TOKEN } from '@delon/auth/token/interface';
import { LocalStorageStore } from '@delon/auth/store/local-storage.service';
import { TokenService } from '@delon/auth/token/token.service';
import { WINDOW } from '@delon/auth/win_tokens';

@NgModule({})
export class DelonAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonAuthModule,
      providers: [
        { provide: WINDOW, useValue: window },
        DelonAuthConfig,
        { provide: DA_STORE_TOKEN, useClass: LocalStorageStore },
        { provide: DA_SERVICE_TOKEN, useClass: TokenService },
      ],
    };
  }
}
