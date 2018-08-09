import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { ConfigService } from './config.service';

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
  providers: []
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [...SERVICES]
    };
  }
}
