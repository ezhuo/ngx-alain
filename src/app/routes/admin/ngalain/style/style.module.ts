import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { StyleRoutingModule } from '@routes/admin/ngalain/style/style-routing.module';
import { ColorService } from '@routes/admin/ngalain/style/color.service';

import { GridMasonryComponent } from '@routes/admin/ngalain/style/gridmasonry/gridmasonry.component';
import { TypographyComponent } from '@routes/admin/ngalain/style/typography/typography.component';
import { ColorsComponent } from '@routes/admin/ngalain/style/colors/colors.component';

@NgModule({
  imports: [SharedModule, StyleRoutingModule],
  declarations: [
    GridMasonryComponent,
    TypographyComponent,
    ColorsComponent,
  ],
  providers: [ColorService],
})
export class StyleModule {}
