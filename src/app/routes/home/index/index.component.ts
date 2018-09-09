import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ParentIndexControl } from '@core';

@Component({
    selector: 'com-home-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less'],
})
export class IndexComponent extends ParentIndexControl
    implements OnInit, OnDestroy {
    array = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

    constructor(protected injector: Injector) {
        super(injector);
        this.pageTitle = '首页';
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }
}
