import { Component, Injector } from '@angular/core';
import { ParentModalControl } from '@core';

@Component({
  selector: 'header-user-info',
  templateUrl: `./userInfo.component.html`,
  styleUrls: [`./userInfo.component.less`],
})
export class HeaderUserInfoComponent extends ParentModalControl {


  constructor(protected injector: Injector) {
    super(injector);
  }

}
