import { Component, OnInit, Injector } from '@angular/core';

import { ParentModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-extras-show',
  template: tplModalShowHTML,
  styles: [``],
})
export class SchemaShowComponent extends ParentModalControl implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('ngOnInit', this);

    this.mainSchema = this.baseFunc.__schemaFormSetTexts({
      properties: {
        agree: {
          type: 'string',
          title: '是否同意'
        }
      },
      'ui': {
        spanLabel: 5,
        spanControl: 19,
      }
    }, ['name', 'email', 'age', 'content']);

  }

}
