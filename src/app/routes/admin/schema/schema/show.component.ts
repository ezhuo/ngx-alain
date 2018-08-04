import { SFSchema } from '@delon/form';
import { Component, OnInit, Injector } from '@angular/core';
import { ParentModalComponent } from '@core/parent';

@Component({
  selector: 'app-extras-show',
  template: `
  <div class='modal-header'>
    <div class='modal-title'>schema-demo</div>
  </div>
  
  <div class="sf-view">
  <sf #sf [schema]='mainSchema' [ui]='mainSchemaUi' [formData]='formData' (formSubmit)='submit(sf)' [button]='none'>
   
  </sf>
  </div>
  <div class='modal-footer'>
      <button nz-button type='button' (click)='modalClose()'>关闭</button>
    </div>
  `,
  styleUrls: [`./edit.less`]
})
export class SchemaShowComponent extends ParentModalComponent implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('ngOnInit', this);
    this.baseFunc.__schemaFormSetText({
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
    });
  }

}
