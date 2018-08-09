import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { Router } from '@angular/router';
import { TokenService, ConfigService } from '@core';

@Component({
  selector: 'home-header-top',
  templateUrl: './home.header.top.component.html',
  styleUrls: ['./home.header.top.component.less']
})
export class HomeHeaderTopComponent {

  constructor(
    public settings: SettingsService,
    public configSrv: ConfigService,
    private router: Router,
    private tokenSrv: TokenService
  ) { }


  logout() {
    this.tokenSrv.token_destory();
    this.router.navigateByUrl(this.configSrv.router.login);
  }
}
