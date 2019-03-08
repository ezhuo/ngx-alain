import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { IndexControl } from '@core';

const changeDetection = ChangeDetectionStrategy.OnPush;

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

  jstree = {
    type: 'edit', // view查看 edit:编辑
    api: '/canton',
    data: [],
    open_all: false,
  };

  jstreeChange($event) {
    console.log($event);
  }
}
