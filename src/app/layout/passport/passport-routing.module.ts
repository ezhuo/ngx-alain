
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './login/login.component';
import { UserLockComponent } from './lock/lock.component';
import { LayoutPassportComponent } from './passport.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: 'lock',
        component: UserLockComponent
      },
      {
        path: '',
        component: UserLoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }

export const routedComponents = [LayoutPassportComponent, UserLoginComponent, UserLockComponent];
