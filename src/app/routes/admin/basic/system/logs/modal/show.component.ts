import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalControl } from '@core';
import { tplModalShowHTML } from '@layout';

@Component({
  selector: 'app-system-logs-show',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsShowComponent extends ModalControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.schemaData.edit = this.appBase.__schemaFormSetTexts({}, []);
  }
}
