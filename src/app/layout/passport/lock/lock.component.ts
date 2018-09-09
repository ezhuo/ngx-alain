import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { InjectorControl } from '@core';
@Component({
    selector: 'passport-lock',
    templateUrl: './lock.component.html',
})
export class UserLockComponent extends InjectorControl
    implements OnInit, OnDestroy {
    f: FormGroup;

    constructor(protected injector: Injector) {
        super(injector);

        this.f = this.FormBuilder.group({
            password: [null, Validators.required],
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    submit() {
        // tslint:disable-next-line:forin
        for (const i in this.f.controls) {
            this.f.controls[i].markAsDirty();
            this.f.controls[i].updateValueAndValidity();
        }
        if (this.f.valid) {
            console.log('Valid!');
            console.log(this.f.value);
            this.route.navigate(['dashboard']);
        }
    }
}
