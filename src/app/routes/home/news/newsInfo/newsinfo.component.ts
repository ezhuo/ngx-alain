import { Component, OnInit, Injector } from '@angular/core';
import { IndexControl } from '@core';

@Component({
  selector: 'com-home-news-info',
  templateUrl: './newsinfo.component.html',
  styleUrls: ['./newsinfo.component.less']
})
export class NewsInfoComponent extends IndexControl implements OnInit {
  data = [];
  constructor(protected injector: Injector) {
    super(injector);
    this.pageTitle = '资讯要闻 > 内容';
  }

  ngOnInit() {
  }

}
