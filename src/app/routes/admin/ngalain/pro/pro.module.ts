import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ProRoutingModule } from '@routes/admin/ngalain/pro/pro-routing.module';

import { BasicFormComponent } from '@routes/admin/ngalain/pro/form/basic-form/basic-form.component';
import { StepFormComponent } from '@routes/admin/ngalain/pro/form/step-form/step-form.component';
import { Step1Component } from '@routes/admin/ngalain/pro/form/step-form/step1.component';
import { Step2Component } from '@routes/admin/ngalain/pro/form/step-form/step2.component';
import { Step3Component } from '@routes/admin/ngalain/pro/form/step-form/step3.component';
import { AdvancedFormComponent } from '@routes/admin/ngalain/pro/form/advanced-form/advanced-form.component';
import { ProTableListComponent } from '@routes/admin/ngalain/pro/list/table-list/table-list.component';
import { ProBasicListComponent } from '@routes/admin/ngalain/pro/list/basic-list/basic-list.component';
import { ProCardListComponent } from '@routes/admin/ngalain/pro/list/card-list/card-list.component';
import { ProListLayoutComponent } from '@routes/admin/ngalain/pro/list/list/list.component';
import { ProListArticlesComponent } from '@routes/admin/ngalain/pro/list/articles/articles.component';
import { ProListProjectsComponent } from '@routes/admin/ngalain/pro/list/projects/projects.component';
import { ProListApplicationsComponent } from '@routes/admin/ngalain/pro/list/applications/applications.component';
import { ProProfileBaseComponent } from '@routes/admin/ngalain/pro/profile/basic/basic.component';
import { ProProfileAdvancedComponent } from '@routes/admin/ngalain/pro/profile/advanced/advanced.component';
import { ProResultSuccessComponent } from '@routes/admin/ngalain/pro/result/success/success.component';
import { ProResultFailComponent } from '@routes/admin/ngalain/pro/result/fail/fail.component';

const COMPONENTS_NOROUNT = [Step1Component, Step2Component, Step3Component];

@NgModule({
  imports: [SharedModule, ProRoutingModule],
  declarations: [
    BasicFormComponent,
    StepFormComponent,
    AdvancedFormComponent,
    ProTableListComponent,
    ProBasicListComponent,
    ProCardListComponent,
    ProListLayoutComponent,
    ProListArticlesComponent,
    ProListProjectsComponent,
    ProListApplicationsComponent,
    ProProfileBaseComponent,
    ProProfileAdvancedComponent,
    ProResultSuccessComponent,
    ProResultFailComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProModule {}
