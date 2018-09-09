import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'passport-register-result',
    templateUrl: './register-result.component.html',
})
export class UserRegisterResultComponent extends InjectorControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }
    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }
}
