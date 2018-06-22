import { Component, ViewChild, Injector } from '@angular/core';
import { SimpleTableComponent, SimpleTableColumn } from '@theme/component/simple-table';

import { AccountEditComponent } from './edit/edit.component';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';

@Component({
  selector: 'com-account',
  templateUrl: './account.component.html',
})
export class AccountComponent extends ParentIndexComponent {
  @ViewChild('st') st: SimpleTableComponent;

  s: any = {
    pi: 1,
    ps: 10,
    s: '',
  };
  url = '/mock/pois';
  columns: SimpleTableColumn[] = [
    { title: '编号', index: 'id', width: '100px' },
    { title: '门店名称', index: 'name' },
    { title: '分店名', index: 'branch_name' },
    { title: '状态', index: 'status_str', width: '100px' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          component: AccountEditComponent,
          paramName: 'i',
          click: () => this.noticeSrv.msg_info('回调，重新发起列表刷新'),
        },
        { text: '图片', click: () => this.noticeSrv.msg_info('click photo') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
        { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
      ],
    },
    {
      title: '自定义',
      render: 'custom'
    },
  ];

  constructor(protected injector: Injector) {
    super(injector);
  }

  add() {
    this.modalSrv
      .static(AccountEditComponent, { i: { id: 0 }, pp: this })
      .subscribe(() => {
        this.st.load();
        this.noticeSrv.msg_info('回调，重新发起列表刷新');
      });
  }

  test(a) {
    console.log('b', a);
  }

  html = ``;

}
