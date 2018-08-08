import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DataVRoutingModule } from './data-v-routing.module';
import { RelationComponent } from './relation/relation.component';

@NgModule({
  imports: [SharedModule, DataVRoutingModule],
  declarations: [RelationComponent],
})
export class DataVModule {}
