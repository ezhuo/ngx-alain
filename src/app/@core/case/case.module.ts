import { NgModule, ModuleWithProviders } from '@angular/core';
import { CaseService } from './case.service';

const SERVICES = [
  CaseService
];

@NgModule({
  imports: [],
  exports: [],
  providers: [
  ]
})
export class CaseModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CaseModule,
      providers: [...SERVICES]
    };
  }
}
