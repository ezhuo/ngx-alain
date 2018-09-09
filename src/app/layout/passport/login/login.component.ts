import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SocialService, SocialOpenType } from '@delon/auth';
import { environment } from '@env/environment';
import { InjectorControl } from '@core';
import { ReuseTabService } from '@delon/abc';
@Component({
    selector: 'app-passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class UserLoginComponent extends InjectorControl
    implements OnInit, OnDestroy {
    form: FormGroup;
    error = '';
    type = 0;
    login$: any;
    captcha$: any;
    captchaData: any = {};
    isLoading: Boolean = false;

    get socialService() {
        return this.injector.get(SocialService);
    }

    get reuseTabSrv() {
        return this.injector.get(ReuseTabService);
    }
    
    constructor(protected injector: Injector) {
        super(injector);

        this.form = this.FormBuilder.group({
            account: [null, [Validators.required, Validators.minLength(1)]],
            password: [null, Validators.required],
            mobile: [
                null,
                [Validators.required, Validators.pattern(/^1\d{10}$/)],
            ],
            captcha: [null, [Validators.required]],
            remember: [true],
        });
        this.modalSrv.closeAll();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.titleSrv.setTitle('用户登录');
        this.getCaptchaPic();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.interval$) clearInterval(this.interval$);
        if (this.login$ && this.login$.subscribe) {
            this.login$.subscribe();
            this.login$ = null;
        }
        if (this.captcha$ && this.captcha$.subscribe) {
            this.captcha$.subscribe();
            this.captcha$ = null;
        }
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
        if (!this.isLoading) return false;
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

    getCaptchaPic() {
        this.isLoading = false;
        if (this.captcha$ && this.captcha$.unsubscribe) {
            this.captcha$.unsubscribe();
        }
        this.captcha$ = this.httpSrv
            .get(`/auth/captcha`)
            .subscribe((result: any) => {
                this.captchaData = result;
            });
    }

    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.account.markAsDirty();
            this.account.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (
                this.account.invalid ||
                this.password.invalid ||
                this.captcha.invalid ||
                !this.captchaData['key']
            )
                return;
        } else {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }

        this.reuseTabSrv.clear();

        if (this.type === 0) {
            this.isLoading = true;
            const value = Object.assign(this.form.value, {
                captchaParams: {
                    key: this.captchaData.key,
                    sensitive: this.captchaData.sensitive,
                },
            });
            this.login$ = this.authSrv.doLogin(value).subscribe(
                (data: any) => {
                    if (this.configSrv.app_debug)
                        console.log('login.component:', data);
                    this.error = '';
                    // this.noticeSrv.msg_success('登录成功！');
                    return this.goDefaultURL();
                },
                error => {
                    console.error('login.component:', error);
                    this.getCaptchaPic();
                    if (error && error.message2) {
                        return (this.error = error.message2);
                    }
                    return (this.error = `账户或密码错误`);
                },
            );
        }
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
                        this.settingsSrv.setUser(res);
                        this.route.navigateByUrl('/');
                    }
                });
        } else {
            this.socialService.login(url, '/', {
                type: 'href',
            });
        }
    }

    goDefaultURL() {
        return this.route.navigate([this.configSrv.config.router.default]);
    }

    // endregion
}
