import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { IndexControl } from '@core';

@Component({
  selector: 'com-home-news-list',
  templateUrl: './newsList.component.html',
  styleUrls: ['./newsList.component.less']
})
export class NewsListComponent extends IndexControl implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
    this.pageTitle = '资讯要闻';
  }

  ngOnInit() {
  }

  data = [
    {
      id: 1,
      title: 'Ant Design Title 1'
    },
    {
      id: 2,
      title: 'Ant Design Title 2'
    },
    {
      id: 3,
      title: 'Ant Design Title 3'
    },
    {
      id: 4,
      title: 'Ant Design Title 4'
    }
  ];

  pagechange($e) {
    console.log($e);
  }

}
