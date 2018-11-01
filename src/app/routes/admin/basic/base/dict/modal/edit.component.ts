import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { ModalControl } from '@core';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: `./edit.component.html`,
  styles: [``],
})
export class DictEditComponent extends ModalControl
  implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.data = Object.assign(
      {},
      this.form.data,
      this.modalParams.dictActive || {},
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit($event: any) {
    const formData = this.formatSubmitData($event.value, this.schemaData.main);

    this.freeData.save = this.httpSrv
      .update(this.primaryData.url, formData, this.primaryData.val)
      .subscribe(result => {
        this.modalClose(result);
      });
  }
}
