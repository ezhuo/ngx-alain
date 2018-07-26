import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DataVRoutingModule } from '@routes/admin/ngalain/data-v/data-v-routing.module';
import { RelationComponent } from '@routes/admin/ngalain/data-v/relation/relation.component';

@NgModule({
  imports: [SharedModule, DataVRoutingModule],
  declarations: [RelationComponent],
})
export class DataVModule {}
