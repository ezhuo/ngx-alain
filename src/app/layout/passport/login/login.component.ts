import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { AuthService } from '@core/data/auth.service';
import { StateService } from '@core/data/state.service';
import { NoticeService } from '@core/utils/notice.service';
import { ConfigService } from '@core/data/config.service';

@Component({
  selector: 'app-passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  login$: any;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    private configSrv: ConfigService,
    private stateSrv: StateService,
    private authSrv: AuthService,
    private noticeSrv: NoticeService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
  ) {
    this.form = fb.group({
      account: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get account() {
    return this.form.controls.account;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  get loading() {
    return this.stateSrv.httpLoading;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // region: get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.account.markAsDirty();
      this.account.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.account.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    if (this.type === 0) {
      this.reuseTabService.clear();
      console.log(this.form.value);
      this.login$ = this.authSrv
        .doLogin(this.form.value)
        .subscribe(
          data => {
            if (this.configSrv.app_debug) console.log('login.component:', data);
            this.error = '';
            this.noticeSrv.notice_success('登录成功！');
            setTimeout(() => {
              return this.goDefaultURL();
            }, 0);
          },
          error => {
            console.error('login.component:', error);
            if (error && error.message2) {
              return this.error = error.message2;
            }
            return this.error = `账户或密码错误`;
          }
        );
    }
    // setTimeout(() => {
    //   this.loading = false;
    //   if (this.type === 0) {
    //     if (
    //       this.userName.value !== 'admin' ||
    //       this.password.value !== '888888'
    //     ) {
    //       this.error = `账户或密码错误`;
    //       return;
    //     }
    //   }

    //   // 清空路由复用信息
    //   this.reuseTabService.clear();
    //   // 设置Token信息
    //   this.tokenService.set({
    //     token: '123456789',
    //     name: this.account.value,
    //     email: `cipchk@qq.com`,
    //     id: 10000,
    //     time: +new Date(),
    //   });
    //   // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
    //   // this.startupSrv.load().then(() => this.router.navigate(['/']));
    //   // 否则直接跳转
    //   this.router.navigate(['/']);
    // }, 1000);


  }

  // region: social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    if (environment.production)
      callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
    else callback = 'http://localhost:4200/callback/' + type;
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }

  goDefaultURL() {
    return this.router.navigate([this.configSrv.config.router.default]);
  }

  // endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
