import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseComponent } from '@theme/parent/base.component';

@Component({
  selector: 'app-parent-index-component',
  template: ``,
  styles: [``]
})
export class ParentIndexComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  // 表格参数
  tableParams: any = {
    ps: 10,
  };

  tableUrl = '';


}
