import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@core/utils/modal.service';
import { NoticeService } from '@core/utils/notice.service';
import { SweetAlertService } from '@core/utils/sweetalert2.service';
import { HttpService } from '@core/net/http.service';
import { StateService } from '@core/data/state.service';
import { AuthService } from '@core/data/auth.service';
import { ConfigService } from '@core/data/config.service';
import { TitleService, MenuService } from '@delon/theme';

@Component({
  selector: 'com-base-component',
  template: ``,
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor(protected injector: Injector) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  get route() {
    return this.injector.get(Router);
  }

  get activeRoute() {
    return this.injector.get(ActivatedRoute);
  }

  get titleBaseSrv() {
    return this.injector.get(Title);
  }

  get titleSrv() {
    return this.injector.get(TitleService);
  }

  get menuSrv() {
    return this.injector.get(MenuService);
  }

  get modalSrv() {
    return this.injector.get(ModalService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get msgSrv() {
    return this.injector.get(NoticeService);
  }

  get sweetSrv() {
    return this.injector.get(SweetAlertService);
  }

  get httpSrv() {
    return this.injector.get(HttpService);
  }

  get stateSrv() {
    return this.injector.get(StateService);
  }

  get configSrv() {
    return this.injector.get(ConfigService);
  }

  get authSrv() {
    return this.injector.get(AuthService);
  }

  // --------------------------------------

  protected ___pageParams: any = {};

  get pageParams() {
    return this.___pageParams;
  }

  set pageParams(value) {
    this.___pageParams = value;
  }

  set pageTitle(value) {
    this.___pageParams.title = value;
    this.titleSrv.default = value;
  }

  get pageTitle() {
    let next = this.activeRoute;
    if (!this.___pageParams.title) {
      while (next.firstChild) next = next.firstChild;
      const data = (next.snapshot && next.snapshot.data) || {};
      this.___pageParams.title = data.title;
    }

    if (!this.___pageParams.title) {
      const menus = this.menuSrv.getPathByUrl(this.route.url);
      if (!menus || menus.length <= 0) return '';
      const item = menus[menus.length - 1];
      this.___pageParams.title = item.text;
    }

    return this.___pageParams.title;
  }

  nzUploadHandleChange = ($event): void => {
    const status = $event.file.status;
    if (status !== 'uploading') {
      // 正在上传
    }
    if (status === 'done') {
      // 上传完成
      $event.fileList[$event.fileList.length - 1].thumbUrl = this.configSrv.api.show + $event.file.response.url;
      $event.fileList[$event.fileList.length - 1].url = this.configSrv.api.show + $event.file.response.url;
      console.log($event.file, $event.fileList);
      this.msgSrv.msg_success(`${$event.file.name} 上传成功！`);
    } else if (status === 'error') {
      // 上传失败
      console.log($event.file, $event.fileList);
      this.msgSrv.msg_error(`${$event.file.name} 上传失败！`);
    }
  }

  nzCascaderLoadData = (node: any, index: number): PromiseLike<any> => {
    const self = this;
    return new Promise((resolve) => {
      const arrCanton = this.stateSrv.cantonList;
      if (index < 0 && arrCanton.length > 0) {
        node.children = arrCanton;
        resolve();
        return;
      }
      return self.httpSrv.get('/canton/selectTree', { fdn: node.value || '' }).subscribe((appdata: any) => {
        appdata.data = appdata.data || [];
        if (appdata.data.length > 0)
          node.children = appdata.data;
        resolve();
      }, (err) => {

      });
    });
  }

}
