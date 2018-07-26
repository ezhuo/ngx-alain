import { NgModule } from '@angular/core';
import { LayoutHomeModule } from '@layout/home/home.module';
import { LayoutDefaultModule } from '@layout/default/default.module';
import { LayoutFullScreenModule } from '@layout/fullscreen/fullscreen.module';

const MODULE = [
  LayoutHomeModule,
  LayoutDefaultModule,
  LayoutFullScreenModule
];

@NgModule({
  imports: [...MODULE],
  providers: [],
  declarations: [],
  exports: [...MODULE],
})
export class LayoutModule { }
