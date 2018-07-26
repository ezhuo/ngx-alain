import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ExtrasRoutingModule } from '@routes/admin/ngalain/extras/extras-routing.module';

import { HelpCenterComponent } from '@routes/admin/ngalain/extras/helpcenter/helpcenter.component';
import { ExtrasSettingsComponent } from '@routes/admin/ngalain/extras/settings/settings.component';
import { ExtrasPoiComponent } from '@routes/admin/ngalain/extras/poi/poi.component';
import { ExtrasPoiEditComponent } from '@routes/admin/ngalain/extras/poi/edit/edit.component';

const COMPONENTS_NOROUNT = [ExtrasPoiEditComponent];

@NgModule({
  imports: [SharedModule, ExtrasRoutingModule],
  declarations: [
    HelpCenterComponent,
    ExtrasSettingsComponent,
    ExtrasPoiComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ExtrasModule {}
