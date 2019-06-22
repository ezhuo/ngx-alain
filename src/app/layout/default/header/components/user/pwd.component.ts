import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IndexControl } from '@core';
import { Observable, Observer } from 'rxjs';

import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'header-user-pwd',
    templateUrl: `pwd.component.html`,
})
export class HeaderUserPwdComponent extends IndexControl
    implements OnInit, OnDestroy {
    validateForm: any;
    error = '';

    constructor(protected injector: Injector) {
        super(injector);

        this.validateForm = this.FormBuilder.group({
            old_pwd: ['', [this.Validators.required]],
            login_pwd: ['', [this.Validators.required]],
            login_pwd2: [
                '',
                [this.Validators.required],
                [this.confrmValidator],
            ],
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    submitForm($event, $value) {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        $value['action'] = 1;
        this.freeData.headPwd = this.httpSrv
            .update('/account/check_pwd', $value, this.userSrv.userInfo.id)
            .subscribe(
                result => {
                    this.modalClose(result);
                },
                err => {
                    this.error = err.error.message;
                },
            );
    }

    /**
     * 请确认密码
     */
    confrmValidator = (control: FormControl) => {
        return Observable.create((observer: Observer<ValidationErrors>) => {
            if (control.value != this.validateForm.value.login_pwd) {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
}
