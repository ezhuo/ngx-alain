import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IndexControl } from '@core';
import { tplModalShowHTML } from '@layout';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'app-system-logs-show',
  template: tplModalShowHTML,
  styles: [``],
  changeDetection,
})
export class LogsShowComponent extends IndexControl implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this, null, { changeDetection });
  }

  ngOnInit() {
    super.ngOnInit();
    this.schemaData.edit = this.appBase.__schemaFormSetTexts({}, []);
  }
}
