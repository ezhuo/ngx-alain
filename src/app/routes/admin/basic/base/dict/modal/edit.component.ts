import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ModalControl } from '@core';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: `./edit.component.html`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DictEditComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.data = Object.assign(
      {},
      this.form.data,
      this.modalData.data || {},
    );
  }

  onSubmit($event: any) {
    const formData = this.appBase.__formatSubmitData(
      $event.value,
      this.schemaData.edit,
    );

    this.freeData.save = this.httpSrv
      .update(this.dataSource.url, formData, this.dataSource.val)
      .subscribe(result => {
        this.modalClose(result);
      });
  }
}
