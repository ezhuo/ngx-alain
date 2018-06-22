import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './users.service';
import { StateService } from './state.service';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const SERVICES = [UserService, StateService, AuthService, TokenService];

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
