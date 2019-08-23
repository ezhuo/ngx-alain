import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { HeaderUserPwdComponent } from './user/pwd.component';
import { HeaderUserInfoComponent } from './user/userInfo.component';
import { InjectorControl } from '@core';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="userSrv.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ userSrv.user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
          <div nz-menu-item (click)="userInfo()">
            <i nz-icon nzType="user" class="mr-sm"></i>个人中心
          </div>
          <div nz-menu-item (click)="changePwd()">
            <i nz-icon nzType="setting" class="mr-sm"></i>修改密码
          </div>
          <li nz-menu-divider></li>
          <div nz-menu-item (click)="logout()">
            <i nz-icon nzType="logout" class="mr-sm"></i>退出登录
          </div>
      </div>
    </nz-dropdown-menu>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent extends InjectorControl
  implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestory() {
    super.ngOnDestroy();
  }

  userInfo() {
    this.modalSrv
      .open(HeaderUserInfoComponent, {}, 'md')
      .subscribe((result: any) => {});
  }

  changePwd() {
    this.modalSrv
      .open(HeaderUserPwdComponent, {}, 'md')
      .subscribe((result: any) => {});
  }

  logout() {
    this.tokenSrv.tokenDestory();
    this.route.navigateByUrl(this.configSrv.router.login);
  }
}
