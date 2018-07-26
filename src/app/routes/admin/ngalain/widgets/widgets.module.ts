import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { WidgetsRoutingModule } from '@routes/admin/ngalain/widgets/widgets-routing.module';

import { WidgetsComponent } from '@routes/admin/ngalain/widgets/widgets/widgets.component';

@NgModule({
  imports: [SharedModule, WidgetsRoutingModule],
  declarations: [WidgetsComponent],
})
export class WidgetsModule {}
