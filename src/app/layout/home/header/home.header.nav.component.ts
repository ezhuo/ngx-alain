import { Component, ViewChild, Inject } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'home-header-nav',
  templateUrl: './home.header.nav.component.html',
  styleUrls: ['./home.header.nav.component.less']
})
export class HomeHeaderNavComponent {

  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) { }


 
}
