import { Component, OnInit, Injector } from '@angular/core';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';

@Component({
  selector: 'com-home-news-info',
  templateUrl: './newsinfo.component.html',
  styleUrls: ['./newsinfo.component.less']
})
export class NewsInfoComponent extends ParentIndexComponent implements OnInit {
  data = [];
  constructor(protected injector: Injector) {
    super(injector);
    this.pageTitle = '资讯要闻 > 内容';
  }

  ngOnInit() {
  }

}
