import { Injectable, Injector } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { SweetAlert } from './sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class NoticeService {
    constructor(private injector: Injector) {}

    private __sweet: SweetAlert = new SweetAlert();
    
    private types: string[] = [
        'default',
        'info',
        'success',
        'warning',
        'error',
        'loading',
    ];

    get nzMsgSrv() {
        return this.injector.get(NzMessageService);
    }

    get nzNoticeSrv() {
        return this.injector.get(NzNotificationService);
    }

    get sweet() {
        return this.__sweet;
    }

    private showNotice(type: string, title: string, body: string) {
        return this.nzNoticeSrv.create(type, title, body);
    }

    private showMsg(type: string, title: string, body: string) {
        return this.nzMsgSrv.create(type, body);
    }

    clear() {
        this.nzNoticeSrv.remove();
        this.nzMsgSrv.remove();
    }

    notice_info(msg, title = '信息') {
        return this.showNotice(this.types[1], title, msg);
    }

    notice_success(msg, title = '成功') {
        return this.showNotice(this.types[2], title, msg);
    }

    notice_warning(msg, title = '警告') {
        return this.showNotice(this.types[3], title, msg);
    }

    notice_error(msg, title = '错误') {
        return this.showNotice(this.types[4], title, msg);
    }

    notice_html(html) {
        // return this.nzNoticeSrv.html(html);
    }

    notice_clear() {
        return this.nzNoticeSrv.remove();
    }

    msg_info(msg, title = '信息') {
        return this.showMsg(this.types[1], title, msg);
    }

    msg_success(msg, title = '成功') {
        return this.showMsg(this.types[2], title, msg);
    }

    msg_warning(msg, title = '警告') {
        return this.showMsg(this.types[3], title, msg);
    }

    msg_error(msg, title = '错误') {
        return this.showMsg(this.types[4], title, msg);
    }

    msg_loading(msg, title = '') {
        return this.nzMsgSrv.loading(msg);
    }

    msg_html(html) {
        // return this.nzMsgSrv.html(html);
    }

    msg_clear() {
        return this.nzMsgSrv.remove();
    }
}
