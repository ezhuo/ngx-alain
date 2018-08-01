import { NgModule } from '@angular/core';
import { LayoutHomeModule } from './home/home.module';
import { LayoutDefaultModule } from './default/default.module';
import { LayoutFullScreenModule } from './fullscreen/fullscreen.module';

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
