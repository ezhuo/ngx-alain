import { Component, OnInit, Injector, Input } from '@angular/core';
import { ConfigService } from '@core';

@Component({
  selector: 'com-home-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class HomeBreadcrumbComponent implements OnInit {

  @Input() current = '';

  constructor(protected injector: Injector, public configSrv: ConfigService) {
  }

  ngOnInit() {
  }

}
