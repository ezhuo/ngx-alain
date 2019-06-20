import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { IndexControl } from '@core';
import { JsTreeOptions } from '@shared';

const changeDetection = ChangeDetectionStrategy.Default;

@Component({
  selector: 'app-base-canton',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection,
})
export class CantonComponent extends IndexControl {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(
      this,
      {
        url: '/canton',
        key: 'canton_id',
      },
      { changeDetection },
    );
  }

  jstree: JsTreeOptions = {
    type: 'edit',
    data: '/canton',
    isOpenAll: false,
  };

  jstreeChange($event) {
    console.log($event);
  }
}
