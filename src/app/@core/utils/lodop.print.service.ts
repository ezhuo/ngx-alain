import { Injectable, Injector } from '@angular/core';

import { LodopService, Lodop } from '@delon/abc/lodop';
import { NoticeService } from './notice.service';
import * as helpers from '@core/helpers';

/**
 * 打印类
 */
@Injectable({
  providedIn: 'root',
})
export class LodopPrintService {
  protected __local = helpers.storageLocal;
  protected __session = helpers.storageSession;
  error: any = true;
  lodop: Lodop = null;
  isLoad = false;
  printIP = '';

  constructor(protected injector: Injector) {}

  get lodopSrv() {
    return this.injector.get(LodopService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  load() {
    if (this.isLoad) {
      return;
    }

    try {
      this._load(this.__local.get('printIP') || 'localhost');
      helpers.getUserIP(ip => {
        this.printIP = ip;
        // this._load(ip);
      });
    } catch (e) {
      this._load();
    }
  }

  _load(ip = 'localhost') {
    this.lodopSrv.cog = {
      license: 'F49DB3070CE17DEAE36358B83283CAF4',
      licenseA: 'F49DB3070CE17DEAE36358B83283CAF4',
      companyName: '浙江杭佳科技发展有限公司',
      url: `http://${ip}:8000/CLodopfuncs.js`,
    };
    this.noticeSrv.msgLoading(`正在连接打印服务...`);
    this.lodopSrv.lodop.subscribe(({ lodop, ok }) => {
      this.noticeSrv.msgClear();
      if (!ok) {
        this.error = true;
        this.noticeSrv.sweet
          .html(
            `<div style='margin:50px;'>
            <a href='/assets/files/CLodop_Setup_for_Win32NT.exe' class='btn btn-warning'>
              请点击此处下载安装打印控件
            </a><br/><br/>
            <div class="checkbox-selectIp">
                <input type="checkbox" id="selectPrinterIp" style="width:18px;height:18px;">
                <label for="selectPrinterIp">使用新IP（${
                  this.printIP
                }）加载打印服务</label>
            </div>
            <br/>
            安装后需要刷新页面
            </div>`,
            {
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              // cancelButtonColor: '#d33',
              confirmButtonText: '安装完成，刷新页面',
              cancelButtonText: '不安装了，不打印了',
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-default',
              buttonsStyling: true,
              reverseButtons: true,
              type: 'warning',
            },
          )
          .then((res: any) => {
            if (res.value) {
              // if (!ok && this.__local.get('printSetup') && ip != this.printIP) {
              if (!ok) {
                // this.__local.set('printSetup', true);
                this.__local.set(
                  'printIP',
                  this.getselectIp() && this.printIP
                    ? this.printIP
                    : 'localhost',
                );
              }

              window.location.reload();
            }
            console.log(res);
          });
        return;
      }
      this.error = false;
      this.isLoad = true;
      this.noticeSrv.msgInfo(`打印机加载成功`);
      this.lodop = lodop;
    });
  }

  printData(data) {
    this.noticeSrv.msgLoading('正在加载打印数据...');
    data = data || {};
    data.intOrient = data.intOrient || 1;
    data.prt_table = data.prt_table || 0;
    data.bkimg = data.bkimg || false;
    let print_html = `<div style="">${data.html}</div>`;
    const print_Top = (data.top || '9') + 'mm';
    const print_Left = (data.left || '2') + 'mm';
    const print_Right = (data.right || '2') + 'mm';
    const print_bottom = (data.bottom || '9') + 'mm';

    const get_lodop = this.lodop;
    if (!get_lodop) {
      return false;
    }
    get_lodop.PRINT_INIT(data.title || '');

    if (data.bkimg) {
      get_lodop.ADD_PRINT_SETUP_BKIMG(
        `<img border='0' src='${data.bkimg}' style='z-index: -1;'/>`,
      );
      get_lodop.SET_SHOW_MODE('BKIMG_IN_PREVIEW', 1);
      get_lodop.SET_SHOW_MODE('BKIMG_PRINT', 1);
      get_lodop.SET_SHOW_MODE('BKIMG_LEFT', '35mm');
      get_lodop.SET_SHOW_MODE('BKIMG_TOP', '35mm');
      // const imgbk = `<img border='0' src='${
      //   data.bkimg
      // }' style='z-index: -1;position: absolute; left:10px; top:100px;'/>`;
      // print_html = print_html + imgbk;
    }

    if (data.intOrient == '1') {
      // 纵向打印
      get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '297mm', '');
    } else if (data.intOrient == '2') {
      // 横向打印
      get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '297mm', '');
    } else {
      // get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '5mm', '');
      get_lodop.SET_PRINT_PAGESIZE(0, '210mm', '5mm', '');
    }

    get_lodop.SET_PRINT_MODE('RESELECT_PRINTER', 1); // 允许重选打印机
    get_lodop.SET_PRINT_MODE('RESELECT_ORIENT', 1); // 允许重选纸张方向
    get_lodop.SET_PRINT_MODE('RESELECT_PAGESIZE', 1); // 允许重选纸张
    get_lodop.SET_PRINT_MODE('RESELECT_COPIES', 1); // 允许重选份数

    if (data.prt_table == '1') {
      get_lodop.ADD_PRINT_TABLE(
        print_Top,
        print_Left,
        'RightMargin:' + print_Right,
        'BottomMargin:' + print_bottom,
        print_html,
      );
    } else {
      get_lodop.ADD_PRINT_HTM(
        print_Top,
        print_Left,
        'RightMargin:' + print_Right,
        'BottomMargin:' + print_bottom,
        print_html,
      );
    }

    return get_lodop.PREVIEW();
  }

  getselectIp() {
    return document.querySelector('#selectPrinterIp')['checked'] || false;
  }
}
