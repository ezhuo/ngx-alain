import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
  selector: 'app-system-cache',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheComponent extends IndexControl implements OnInit {
  iconType = 'delete';

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this, { url: '/public/cache_clear', key: '' });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  clearCache() {
    this.freeData.cache = this.httpSrv
      .post(this.dataSource.url)
      .subscribe((result: any) => {
        this.iconType = 'success';
        this.detectChanges();
        console.log(result);
      });
  }
}
