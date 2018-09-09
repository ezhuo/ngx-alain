import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { ParentIndexControl } from '@core';

@Component({
    selector: 'com-home-news',
    template: `
    <div class='body-content'>
      <router-outlet></router-outlet>
    </div>
    `,
    styleUrls: ['./news.component.less'],
})
export class NewsComponent extends ParentIndexControl
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
