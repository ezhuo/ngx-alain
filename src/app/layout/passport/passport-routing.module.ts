
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from '@layout/passport/login/login.component';
import { UserLockComponent } from '@layout/passport/lock/lock.component';
import { LayoutPassportComponent } from '@layout/passport/passport.component';
import { UserRegisterComponent } from '@layout/passport/register/register.component';
import { UserRegisterResultComponent } from '@layout/passport/register-result/register-result.component';

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
        path: 'register',
        component: UserRegisterComponent,
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
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

export const routedComponents = [
  LayoutPassportComponent,
  UserLoginComponent,
  UserLockComponent,
  UserRegisterComponent,
  UserRegisterResultComponent
];
