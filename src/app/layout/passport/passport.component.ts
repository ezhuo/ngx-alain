import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent extends InjectorControl
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

    links = [
        {
            title: '帮助',
            href: '',
        },
        {
            title: '隐私',
            href: '',
        },
        {
            title: '条款',
            href: '',
        },
    ];
}
