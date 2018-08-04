import { Component, OnInit, Injector } from '@angular/core';
import { ParentIndexComponent } from '@core/parent';

@Component({
  selector: 'com-home-zzsh',
  templateUrl: './zzsh.component.html',
  styleUrls: ['./zzsh.component.less']
})
export class ZzshComponent extends ParentIndexComponent implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
