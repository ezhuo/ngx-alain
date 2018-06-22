import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

import { ModalService } from '@core/utils/modal.service';
import { ThemeModule } from '@theme/theme.module';

// region: third libs

import { ThirdComponentModuleList } from '@shared/third-component.module';

const THIRDMODULES = [
  ...ThirdComponentModuleList
];
// endregion

// region: your Modules & componets & directives & providers 
const MODULES = [
  CommonModule, FormsModule, RouterModule, ReactiveFormsModule,
  DelonABCModule, DelonACLModule, DelonFormModule,
  ThemeModule
];
const COMPONENTS = [];
const DIRECTIVES = [];
const PROVIDERS = [ModalService];
// endregion


@NgModule({
  imports: [
    ...MODULES,
    AlainThemeModule.forChild(),
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...MODULES,
    AlainThemeModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ]
})
export class SharedModule { }
