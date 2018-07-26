import { Component, ViewChild, Injector, OnInit, OnDestroy } from '@angular/core';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';

@Component({
  selector: 'com-home-news',
  template: `
    <div class='body-content'>
    <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./news.component.less']
})
export class NewsComponent extends ParentIndexComponent implements OnInit, OnDestroy {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnDestroy() {
  }


}
