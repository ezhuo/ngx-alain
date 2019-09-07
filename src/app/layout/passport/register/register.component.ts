import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { InjectorControl } from '@core';

@Component({
    selector: 'passport-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent extends InjectorControl
    implements OnInit, OnDestroy {
    _form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    visible = false;
    status = 'pool';
    progress = 0;
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception',
    };

    constructor(protected injector: Injector) {
        super(injector);

        this._form = this.FormBuilder.group({
            mail: [null, [Validators.email]],
            password: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.checkPassword.bind(this),
                ],
            ],
            confirm: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.passwordEquar,
                ],
            ],
            mobilePrefix: ['+86'],
            mobile: [
                null,
                [Validators.required, Validators.pattern(/^1\d{10}$/)],
            ],
            captcha: [null, [Validators.required]],
        });
    }

    static checkPassword(control: FormControl) {
        if (!control) return null;
        const self: any = this;
        self.visible = !!control.value;
        if (control.value && control.value.length > 9) self.status = 'ok';
        else if (control.value && control.value.length > 5)
            self.status = 'pass';
        else self.status = 'pool';

        if (self.visible)
            self.progress =
                control.value.length * 10 > 100
                    ? 100
                    : control.value.length * 10;
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null;
        if (control.value !== control.parent.get('password').value) {
            return { equar: true };
        }
        return null;
    }

    // region: fields

    get mail() {
        return this._form.controls.mail;
    }
    get password() {
        return this._form.controls.password;
    }
    get confirm() {
        return this._form.controls.confirm;
    }
    get mobile() {
        return this._form.controls.mobile;
    }
    get captcha() {
        return this._form.controls.captcha;
    }

    // endregion

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
        for (const i in this._form.controls) {
            this._form.controls[i].markAsDirty();
            this._form.controls[i].updateValueAndValidity();
        }
        if (this._form.invalid) return;
        // mock http
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.route.navigate(['/passport/register-result']);
        }, 1000);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.interval$) clearInterval(this.interval$);
    }
}
