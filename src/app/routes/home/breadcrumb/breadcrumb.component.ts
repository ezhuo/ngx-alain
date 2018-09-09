import { Component, Injector, Input, OnInit, OnDestroy } from '@angular/core';
import { InjectorControl } from '@core';

@Component({
    selector: 'com-home-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.less'],
})
export class HomeBreadcrumbComponent extends InjectorControl
    implements OnInit, OnDestroy {
    @Input()
    current = '';

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
