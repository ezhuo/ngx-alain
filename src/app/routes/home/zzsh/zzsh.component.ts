import { Component, OnInit, Injector } from '@angular/core';
import { ParentIndexControl } from '@core';

@Component({
  selector: 'com-home-zzsh',
  templateUrl: './zzsh.component.html',
  styleUrls: ['./zzsh.component.less']
})
export class ZzshComponent extends ParentIndexControl implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
