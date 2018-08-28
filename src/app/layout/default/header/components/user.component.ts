import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { UserService, TokenService, ConfigService, ModalService } from '@core';

import { HeaderUserPwdComponent } from './user/pwd.component';
import { HeaderUserInfoComponent } from './user/userInfo.component';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="userSrv.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{userSrv.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="userInfo()"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item (click)="changePwd()"><i class="anticon anticon-lock mr-sm"></i>修改密码</div>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    public userSrv: UserService,
    private router: Router,
    private tokenSrv: TokenService,
    private configSrv: ConfigService,
    private modalSrv: ModalService
  ) { }

  userInfo() {
    this.modalSrv.open(HeaderUserInfoComponent, {}, 'md').subscribe((result: any) => { });
  }

  changePwd() {
    this.modalSrv.open(HeaderUserPwdComponent, {}, 'md').subscribe((result: any) => { });
  }

  logout() {
    this.tokenSrv.tokenDestory();
    this.router.navigateByUrl(this.configSrv.router.login);
  }

}
