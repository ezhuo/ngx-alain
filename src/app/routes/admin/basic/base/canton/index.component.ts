import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { IndexControl } from '@core';

@Component({
    selector: 'app-base-canton',
    templateUrl: `./index.component.html`,
    styleUrls: [`./index.component.less`],
})
export class CantonComponent extends IndexControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
        super.__init('/canton', 'canton_id');
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    jstree = {
        type: 'edit', // view查看 edit:编辑
        api: '/canton',
        data: [],
        open_all: false,
    };

    jstreeChange($event) {
        console.log($event);
    }
}
