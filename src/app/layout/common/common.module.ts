import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { HeaderNotifyComponent } from './notify.component';
import { HeaderFullScreenComponent } from './fullscreen.component';

const COMPONENTS = [HeaderNotifyComponent, HeaderFullScreenComponent];

const entryComponents = [];

@NgModule({
  declarations: [...COMPONENTS, ...entryComponents],
  imports: [SharedModule],
  exports: [...COMPONENTS],
  providers: [],
  entryComponents: [...entryComponents],
})
export class LayoutCommonModule {}
