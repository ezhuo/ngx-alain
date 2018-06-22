import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule, routedComponents } from './routes-routing.module';

import { LayoutModule } from '@layout/layout.module';

const COMPONENTS = [...routedComponents];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, LayoutModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
