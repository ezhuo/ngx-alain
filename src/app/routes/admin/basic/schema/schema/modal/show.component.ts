import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-extras-show',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SchemaShowComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('ngOnInit', this);

    this.schemaData.edit = this.appBase.__schemaFormSetTexts(
      {
        properties: {
          agree: {
            type: 'string',
            title: '是否同意',
          },
        },
        ui: {
          spanLabel: 5,
          spanControl: 19,
        },
      },
      ['name', 'email', 'age', 'content'],
    );
  }
}
