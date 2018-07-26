import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/data/users.service';
import { StateService } from '@core/data/state.service';

import { AuthService } from '@core/data/auth.service';
import { TokenService } from '@core/data/token.service';
import { ConfigService } from '@core/data/config.service';

const SERVICES = [
  UserService,
  StateService,
  AuthService,
  TokenService,
  ConfigService
];

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [
    ...SERVICES
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [...SERVICES]
    };
  }
}
