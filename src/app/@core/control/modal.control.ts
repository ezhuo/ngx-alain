import { OnInit, OnDestroy, Injector } from '@angular/core';

import { IndexControl } from './index.control';
import { DataSource } from '../model';

export class ModalControl extends IndexControl implements OnInit, OnDestroy {
  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: any,
  ) {
    return super.__init__(child, dataSource, params);
  }

  // ------------------
}
