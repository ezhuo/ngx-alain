import { Component, ViewChild, Injector } from '@angular/core';

import { ParentIndexComponent } from '@routes/parent/parent.index.component';

@Component({
  selector: 'com-home-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent extends ParentIndexComponent {
  array = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

  constructor(protected injector: Injector) {
    super(injector);
    this.pageTitle = '首页';
  }



}
