import { Exception500Component } from '@layout/exception/exception/500.component';
import { Exception404Component } from '@layout/exception/exception/404.component';
import { Exception403Component } from '@layout/exception/exception/403.component';
import { LayoutExceptionComponent } from '@layout/exception/exception.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutExceptionComponent,
    children: [
      {
        path: '403',
        component: Exception403Component
      },
      {
        path: '404',
        component: Exception404Component
      },
      {
        path: '500',
        component: Exception500Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }

export const routedComponents = [LayoutExceptionComponent, Exception403Component, Exception404Component, Exception500Component];
