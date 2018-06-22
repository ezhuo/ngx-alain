import { Component, OnInit, OnDestroy, Inject, Injector, Optional } from '@angular/core';
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
    console.log('parent-nginit');
  }

  ngOnDestroy() {
    console.log('parent-ngOnDestroy');
  }

}
