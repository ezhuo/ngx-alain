import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
  selector: 'header-user-info',
  templateUrl: `./userInfo.component.html`,
  styleUrls: [`./userInfo.component.less`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserInfoComponent extends IndexControl
  implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('----', this.userSrv.userInfo);
  }

  ngOnDestory() {
    super.ngOnDestroy();
  }
}
