import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalShowHTML } from '@theme';

@Component({
  selector: 'app-system-logs-show',
  template: tplModalShowHTML,
  styles: [``]
})
export class LogsShowComponent extends ParentModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.mainSchema = this.baseFunc.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
