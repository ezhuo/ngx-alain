import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { ParentModalControl } from '@core';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: `./edit.component.html`,
  styles: [``],
})
export class DictEditComponent extends ParentModalControl
  implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formData = Object.assign(
      {},
      this.formData,
      this.modalParams.dictActive || {},
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit($event: any) {
    const formData = this.formatSubmitData($event.value, this.mainSchema);

    this.freeData.save = this.httpSrv
      .update(this.primaryURL, formData, this.primaryValue)
      .subscribe(result => {
        this.modalClose(result);
      });
  }
}
