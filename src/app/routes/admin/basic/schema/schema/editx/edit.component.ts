import { Component, OnInit, Injector } from '@angular/core';
import { ModalControl } from '@core';

@Component({
  selector: 'app-schema-edit',
  templateUrl: './edit.component.html',
})
export class SchemaFormEditxComponent extends ModalControl implements OnInit {
  i: any;
  pp: any;
  cat: string[] = ['美食', '美食,粤菜', '美食,粤菜,湛江菜'];

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if (this.i.id > 0) {
      this.httpSrv
        .get('./assets/tmp/pois.json')
        .subscribe((res: any) => (this.i = res.data[0]));
    }
  }

  save() {
    this.httpSrv.get('./assets/tmp/pois.json').subscribe(() => {
      this.noticeSrv.msgSuccess('保存成功，只是模拟，实际未变更');
      this.modalRef.close(true);
      this.close();
    });
  }

  close() {
    this.modalRef.destroy();
  }

  parent() {
    const a = this.pp;
    console.log(a.test({ a: 1 }));
  }
}
