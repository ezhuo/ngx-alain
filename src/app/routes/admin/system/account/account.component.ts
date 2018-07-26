import { Component, ViewChild, Injector, OnInit, OnDestroy } from '@angular/core';

import { SimpleTableComponent, SimpleTableColumn } from '@delon/abc';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';

import { AccountEditComponent } from '@routes/admin/system/account/edit/edit.component';

@Component({
  selector: 'com-account',
  templateUrl: './account.component.html',
  styleUrls: [`./account.component.less`]
})
export class AccountComponent extends ParentIndexComponent implements OnInit, OnDestroy {
  @ViewChild('st') st: SimpleTableComponent;

  constructor(protected injector: Injector) {
    super(injector);
    this.tableParams.s = '';
  }

  tableUrl = '/account';

  tableColumns: SimpleTableColumn[] = [
    { title: '登录名', index: 'login_username', width: '100px' },
    { title: '真实姓名', index: 'true_name' },
    { title: '角色', index: 'role_name' },
    { title: '手机', index: 'tel' },
    { title: '联系地址', index: 'address' },
    { title: '状态', index: 'state_str', width: '100px', render: 'state_str' },
    {
      title: '操作',
      width: '180px',
      fixed: 'right',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          component: AccountEditComponent,
          paramName: 'i',
          click: () => this.noticeSrv.msg_info('回调，重新发起列表刷新'),
        },
        {
          text: '操作', children: [
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
            { text: '经营SKU', click: () => this.noticeSrv.msg_info('click sku') },
          ]
        },

      ],
    },
  ];

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  add() {
    this.modalSrv
      .static(AccountEditComponent, { i: { id: 0 }, pp: this })
      .subscribe(() => {
        this.st.load();
        this.noticeSrv.msg_info('回调，重新发起列表刷新');
      });
  }

  statusRender(d) {
    switch (d) {
      case 1:
        return '正常';
      case 0:
        return '未验证';
      case 2:
        return '禁用';
    }
  }

  test(a) {
    console.log('b', a);
  }

}
