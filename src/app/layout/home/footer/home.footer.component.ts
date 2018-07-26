import { Component, ViewChild, Inject } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'home-footer',
  templateUrl: './home.footer.component.html',
  styleUrls: ['./home.footer.component.less']
})
export class HomeFooterComponent {

  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) { }


 
}
