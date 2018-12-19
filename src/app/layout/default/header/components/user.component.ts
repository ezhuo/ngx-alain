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
    <nz-dropdown nzPlacement="bottomRight">
      <div
        class="alain-default__nav-item d-flex align-items-center px-sm"
        nz-dropdown
      >
        <nz-avatar
          [nzSrc]="userSrv.user.avatar"
          nzSize="small"
          class="mr-sm"
        ></nz-avatar>
        {{ userSrv.user.name }}
      </div>
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="userInfo()">
          <i nz-icon type="user" class="mr-sm"></i>个人中心
        </div>
        <div nz-menu-item (click)="changePwd()">
          <i nz-icon type="setting" class="mr-sm"></i>修改密码
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon type="logout" class="mr-sm"></i>退出登录
        </div>
      </div>
    </nz-dropdown>
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
