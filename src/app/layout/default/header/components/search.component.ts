import {
    Component,
    HostBinding,
    Input,
    Injector,
    AfterViewInit,
    OnInit,
    OnDestroy,
} from '@angular/core';

import { InjectorControl } from '@core';

@Component({
    selector: 'header-search',
    template: `
  <nz-input-group [nzAddOnBeforeIcon]="focus ? 'anticon anticon-arrow-down' : 'anticon anticon-search'">
    <input nz-input [(ngModel)]="q" (focus)="qFocus()" (blur)="qBlur()" (keyup.enter)="onEnter()"
      [placeholder]="'请查询'">
  </nz-input-group>

  `,
})
export class HeaderSearchComponent extends InjectorControl
    implements OnInit, OnDestroy, AfterViewInit {
    q: string;

    qIpt: HTMLInputElement;

    @HostBinding('class.alain-default__search-focus')
    focus = false;

    @HostBinding('class.alain-default__search-toggled')
    searchToggled = false;

    @Input()
    set toggleChange(value: boolean) {
        if (typeof value === 'undefined') return;
        this.searchToggled = true;
        this.focus = true;
        this.freeTimeOut.tc = setTimeout(() => this.qIpt.focus(), 300);
    }

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ngAfterViewInit() {
        this.qIpt = (this.eleRef.nativeElement as HTMLElement).querySelector(
            '.ant-input',
        ) as HTMLInputElement;
    }

    qFocus() {
        this.focus = true;
    }

    qBlur() {
        this.focus = false;
        this.searchToggled = false;
    }

    onEnter() {
        if ((this.q + '').length > 5) this.qSearch();
    }

    qSearch(isUpdate: boolean = false) {
        this.noticeSrv.msg_loading('正在查询...');
        this.freeData.http = this.httpSrv
            .post('/cardSearch/' + this.q, {
                isUpdate,
            })
            .subscribe(
                (result: any) => {
                    this.q = '';
                },
                err => {},
            );
    }
}
