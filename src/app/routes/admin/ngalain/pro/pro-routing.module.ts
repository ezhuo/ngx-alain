import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepFormComponent } from '@routes/admin/ngalain/pro/form/step-form/step-form.component';
import { AdvancedFormComponent } from '@routes/admin/ngalain/pro/form/advanced-form/advanced-form.component';
import { BasicFormComponent } from '@routes/admin/ngalain/pro/form/basic-form/basic-form.component';
import { ProTableListComponent } from '@routes/admin/ngalain/pro/list/table-list/table-list.component';
import { ProBasicListComponent } from '@routes/admin/ngalain/pro/list/basic-list/basic-list.component';
import { ProCardListComponent } from '@routes/admin/ngalain/pro/list/card-list/card-list.component';
import { ProListArticlesComponent } from '@routes/admin/ngalain/pro/list/articles/articles.component';
import { ProListProjectsComponent } from '@routes/admin/ngalain/pro/list/projects/projects.component';
import { ProListApplicationsComponent } from '@routes/admin/ngalain/pro/list/applications/applications.component';
import { ProProfileBaseComponent } from '@routes/admin/ngalain/pro/profile/basic/basic.component';
import { ProProfileAdvancedComponent } from '@routes/admin/ngalain/pro/profile/advanced/advanced.component';
import { ProResultSuccessComponent } from '@routes/admin/ngalain/pro/result/success/success.component';
import { ProResultFailComponent } from '@routes/admin/ngalain/pro/result/fail/fail.component';
import { ProListLayoutComponent } from '@routes/admin/ngalain/pro/list/list/list.component';

const routes: Routes = [
  {
    path: 'form',
    children: [
      { path: 'basic-form', component: BasicFormComponent },
      { path: 'step-form', component: StepFormComponent },
      { path: 'advanced-form', component: AdvancedFormComponent },
    ],
  },
  {
    path: 'list',
    children: [
      { path: 'table-list', component: ProTableListComponent },
      { path: 'basic-list', component: ProBasicListComponent },
      { path: 'card-list', component: ProCardListComponent },
      {
        path: '',
        component: ProListLayoutComponent,
        children: [
          { path: 'articles', component: ProListArticlesComponent },
          { path: 'projects', component: ProListProjectsComponent },
          { path: 'applications', component: ProListApplicationsComponent },
        ],
      },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: 'basic', component: ProProfileBaseComponent },
      { path: 'advanced', component: ProProfileAdvancedComponent },
    ],
  },
  {
    path: 'result',
    children: [
      { path: 'success', component: ProResultSuccessComponent },
      { path: 'fail', component: ProResultFailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule {}
