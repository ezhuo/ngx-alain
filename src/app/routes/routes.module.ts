import { NgModule } from '@angular/core';
import { RouteRoutingModule, routedComponents } from './routes-routing.module';

import { LayoutModule } from '@layout/layout.module';

const COMPONENTS = [...routedComponents];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [RouteRoutingModule, LayoutModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
