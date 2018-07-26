import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { UserService } from '@core/data/users.service';
import { TokenService } from '@core/data/token.service';
import { Router } from '@angular/router';
import { ConfigService } from '@core/data/config.service';

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
    this.tokenSrv.token_destory();
    this.router.navigateByUrl(this.configSrv.router.login);
  }

}
