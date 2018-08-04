import { Component, ViewChild, Injector, OnInit, OnDestroy } from '@angular/core';

import { SimpleTableComponent } from '@delon/abc';
import { ParentIndexComponent } from '@core/parent';

import { AccountEditComponent } from '@routes/admin/system/account/edit/edit.component';

import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'com-account',
  templateUrl: './account.component.html',
  styleUrls: [`./account.component.less`]
})
export class AccountComponent extends ParentIndexComponent implements OnInit, OnDestroy {
  @ViewChild('st') st: SimpleTableComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init('/account', 'account_id');
    this.mainTableParams.s = '';

    this.mainTableColumns = [
      { title: '登录名', index: 'login_username', width: '100px' },
      { title: '真实姓名', index: 'true_name' },
      { title: '角色', index: 'role_name' },
      { title: '手机', index: 'tel' },
      { title: '联系地址', index: 'address' },
      {
        title: '状态', index: 'state_str', width: '100px', format: (item: any, col: any) => {
          switch (item.status) {
            case 1:
              return '正常';
            case 0:
              return '未验证';
            case 2:
              return '禁用';
          }
        }
      },
      {
        title: '操作',
        width: '180px',
        fixed: 'right',
        buttons: [
          {
            text: '编辑',
            type: 'modal',
            component: AccountEditComponent,
            params: this.modalParamsFromTable.bind(this),
            paramName: 'formData',
            click: (record, btnRes) => {
              this.noticeSrv.msg_info('回调，重新发起列表刷新');
              console.log(record, btnRes);
            },
          },
          {
            text: '操作', children: [
              {
                text: '删除', click: (record, btnRes) => this.caseSrv.deleteAlert(null, record).then((res) => {
                  console.log(res);
                  this.st.reload();
                }).catch((err) => {
                  console.log(err);
                })
              },
            ]
          },

        ],
      },
    ];

  }


  ngOnInit() {
    super.ngOnInit();
    this.getCompanyList();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  add() {
    this.modalSrv
      .static(AccountEditComponent, this.modalParams())
      .subscribe((result) => {
        console.log(result);
        this.st.load();
        this.noticeSrv.msg_info('回调，重新发起列表刷新');
      });
  }

  treeCompany = [];
  treeCompanyExpandKeys = [];
  getCompanyList() {
    this.___pageData$.company = this.httpSrv.get('/companyinfo/tree').subscribe((result: any) => {
      result.data.list.forEach((node, idx) => {
        console.log(idx);
        if (idx === 0) {
          this.treeCompanyExpandKeys.push(node.key);
        }
        this.treeCompany.push(new NzTreeNode(node));
      });
    });
  }

  mouseTreeAction(name: string, event: NzFormatEmitEvent): void {
    console.log(name, event);
  }

}
