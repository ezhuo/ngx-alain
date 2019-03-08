import {
  Component,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IndexControl } from '@core';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'app-system-cache',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection,
})
export class CacheComponent extends IndexControl implements OnInit {
  iconType = 'delete';

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(
      this,
      { url: '/public/cache_clear', key: '' },
      { changeDetection },
    );
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
