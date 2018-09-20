import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-system-logs-show',
  template: tplModalShowHTML,
  styles: [``]
})
export class LogsShowComponent extends ModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.mainSchema = this.appBase.__schemaFormSetTexts({}, []);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
