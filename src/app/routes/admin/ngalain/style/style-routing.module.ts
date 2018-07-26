import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridMasonryComponent } from '@routes/admin/ngalain/style/gridmasonry/gridmasonry.component';
import { TypographyComponent } from '@routes/admin/ngalain/style/typography/typography.component';
import { ColorsComponent } from '@routes/admin/ngalain/style/colors/colors.component';

const routes: Routes = [
  { path: 'gridmasonry', component: GridMasonryComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'colors', component: ColorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyleRoutingModule {}
