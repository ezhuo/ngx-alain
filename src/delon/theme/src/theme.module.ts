import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WINDOW } from '@delon/theme/src/win_tokens';

// region: import
import { ALAIN_I18N_TOKEN, AlainI18NServiceFake } from '@delon/theme/src/services/i18n/i18n';

import { ModalHelper } from '@delon/theme/src/services/modal/modal.helper';
const HELPERS = [ModalHelper];

// components
const COMPONENTS = [];

// pipes
import { DatePipe } from '@delon/theme/src/pipes/date/date.pipe';
import { CNCurrencyPipe } from '@delon/theme/src/pipes/currency/cn-currency.pipe';
import { KeysPipe } from '@delon/theme/src/pipes/keys/keys.pipe';
import { YNPipe } from '@delon/theme/src/pipes/yn/yn.pipe';
const PIPES = [DatePipe, CNCurrencyPipe, KeysPipe, YNPipe];

// endregion

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES],
})
export class AlainThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlainThemeModule,
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: ALAIN_I18N_TOKEN, useClass: AlainI18NServiceFake },
        ...HELPERS,
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AlainThemeModule,
      providers: [...HELPERS],
    };
  }
}
