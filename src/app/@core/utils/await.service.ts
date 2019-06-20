import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../net/http.service';
import * as helpers from '../helpers';
import { UserService } from '../data/users.service';

import { MenuService } from '@delon/theme';
import { NoticeService } from './notice.service';

@Injectable({
  providedIn: 'root',
})
export class AwaitService {
  protected __session = helpers.storageSession;
  constructor(private injector: Injector) {}

  get httpSrv() {
    return this.injector.get(HttpService);
  }

  get menuSrv() {
    return this.injector.get(MenuService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get userSrv() {
    return this.injector.get(UserService);
  }

  getAwaitCount() {
    const menus = this.menuSrv.getPathByUrl(`/admin/await/list`);
    if (menus.length < 1) return false;
    // return false;
    return this.httpSrv.requestPrototype('get', `/dash/await-count`).subscribe(
      ({ data }) => {
        const cnt = data.data || 0;
        const tr1 = setTimeout(() => {
          menus[1].badge = cnt;
          this.menuSrv.resume();
          clearTimeout(tr1);
        }, 1);
        if (cnt > 0) {
          const cnt2 = this.__session.get('msgCnt') || 0;
          if (cnt > parseInt(cnt2, 10)) {
            this.__session.set('msgCnt', cnt);
            const tr = setTimeout(() => {
              this.noticeSrv.noticeInfo(
                `您有新消息，请注意查看代办事项！`,
                `${cnt} 件代办事项`,
              );
              clearTimeout(tr);
            }, 0);
          }
        }
      },
      err => {},
    );
  }
}
