import { Component, Inject, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'home-header-user',
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
          <div nz-menu-item>
            <i nz-icon nzType="user" class="mr-sm"></i>个人中心
          </div>
          <div nz-menu-item>
            <i nz-icon nzType="book" class="mr-sm"></i>我的预约
          </div>
          <li nz-menu-divider></li>
          <div nz-menu-item>
            <i nz-icon nzType="lock" class="mr-sm"></i>修改密码
          </div>
      </div>
    </nz-dropdown-menu>
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
