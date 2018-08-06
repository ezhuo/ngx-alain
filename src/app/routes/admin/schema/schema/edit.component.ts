import { Component, OnInit, Injector } from '@angular/core';
import { ParentModalComponent } from '@core/parent';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-extras-show',
  template: `
  <div class='modal-header'>
    <div class='modal-title'>schema-demo</div>
  </div>
  
  <div class="sf-view">
  <sf #sf [schema]='mainSchema' [ui]='mainSchemaUi' [formData]='formData' (formSubmit)='submit(sf)' [button]="'none'">
  </sf>
  </div>

  <div class='modal-footer'>
      <button nz-button type='button' (click)='modalClose()'>关闭</button>
      <button (click)='sf.submit()' nz-button [disabled]='!sf.valid'>保存</button>
      <button (click)='sf.reset()' type='button' nz-button>重置</button>
  </div>
  
  `,
  styleUrls: [`./edit.less`],
})
export class SchemaEditComponent extends ParentModalComponent implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log(this.mainSchema);
  }

  save() {
    this.httpSrv.get('./assets/tmp/pois.json').subscribe(() => {
      this.noticeSrv.msg_success('保存成功，只是模拟，实际未变更');
      this.modalRef.close(true);
      this.modalClose();
    });
  }

  submit($event: any) {
    debugger;
    console.log($event.value);
  }

}
