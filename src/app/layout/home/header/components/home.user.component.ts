import { Component, Inject, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

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
export class HomeHeaderUserComponent extends InjectorControl
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
}
