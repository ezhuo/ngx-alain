import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IndexControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-extras-show',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SchemaShowComponent extends IndexControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('ngOnInit', this);

    this.schemaData.edit = this.__schemaFormSetTexts(
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
