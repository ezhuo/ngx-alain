import { UserService } from '@core/data/users.service';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'home-header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="userSrv.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{userSrv.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <li nz-menu-divider></li>
      <div nz-menu-item><i class="anticon anticon-book mr-sm"></i>我的预约</div>
      <div nz-menu-item><i class="anticon anticon-book mr-sm"></i>我的会议</div>
      <li nz-menu-divider></li>
      <div nz-menu-item><i class="anticon anticon-lock mr-sm"></i>修改密码</div>
    </div>
  </nz-dropdown>
  `,
})
export class HomeHeaderUserComponent {
  constructor(
    public settings: SettingsService,
    public userSrv: UserService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }

}
