import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SettingsService } from '@delon/theme';
import { UserService, TokenService, ConfigService } from '@core';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService, private router: Router,
    private configSrv: ConfigService,
    private tokenSrv: TokenService) { }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  goHome() {
    this.router.navigateByUrl(this.configSrv.router.home);
  }

  logout() {
    this.tokenSrv.tokenDestory();
    this.router.navigateByUrl(this.configSrv.router.login);
  }

}
