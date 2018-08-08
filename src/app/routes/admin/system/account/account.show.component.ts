import { Component, Injector, OnInit, OnDestroy } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalShowHTML } from '@theme';

@Component({
  selector: 'app-account-edit',
  template: tplModalShowHTML,
  styles: [``]
})
export class AccountShowComponent extends ParentModalControl implements OnInit, OnDestroy {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.mainSchema = this.baseFunc.__schemaFormSetTexts({}, []);
    console.log(this.mainSchema);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit($event: any) {
    debugger;
    console.log($event.value);
  }

}
