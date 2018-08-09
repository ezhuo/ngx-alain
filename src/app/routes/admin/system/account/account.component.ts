import { Component, ViewChild, Injector, OnInit, OnDestroy } from '@angular/core';

import { SimpleTableComponent } from '@delon/abc';
import { ParentIndexControl } from '@core';

import { AccountEditComponent } from './account.edit.component';
import { AccountShowComponent } from './account.show.component';

import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

import { FormProperty, PropertyGroup } from '@delon/form';

import { tplMainIndexActionHTML } from '@theme';

@Component({
  selector: 'com-account',
  templateUrl: `./account.component.html`,
  styleUrls: [`./account.component.less`]
})
export class AccountComponent extends ParentIndexControl implements OnInit, OnDestroy {
  @ViewChild('st') st: SimpleTableComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init('/account', 'account_id');

    this.searchSchema = {
      properties: {
        'name': {
          'type': 'string',
          'title': '',
          ui: {
            placeholder: '姓名',
            width: 120
          }
        },
        'age': {
          'type': 'number',
          'title': '',
          'minLength': 5,
          'minimum': 18,
          'maximum': 50,
          'default': 25,
          ui: {
            placeholder: '年龄'
          }
        },
        'yesOrNot': {
          'type': 'boolean',
          'title': '允许售卖',
          'default': true,
        },
        'agree': {
          'type': 'boolean',
          'title': '同意《用户协议》',
          'ui': 'checkbox'
        },
        'birthday': {
          'type': 'string',
          'title': '生日',
          'format': 'date'
        },
        'status': {
          'type': 'string',
          'title': '状态',
          'enum': [
            { 'label': '待支付', 'value': 'WAIT_BUYER_PAY' },
            { 'label': '已支付', 'value': 'TRADE_SUCCESS' },
            { 'label': '交易完成', 'value': 'TRADE_FINISHED' }
          ],
          'default': 'WAIT_BUYER_PAY'
        },
        s: {
          type: 'string',
          title: '',
          enum: [
            { label: '状态不限', value: '' },
            { label: '正常', value: '1' },
          ],
          default: '1',
        }
      },
      ui: {}
    };

    this.mainSchema = {
      properties: {
        images: {
          type: 'string',
          title: '照片',
          format: 'uri',
          ui: {
            debug: true,
            widget: 'uploadAvatar',
            action: this.configSrv.api.upload,
            change: this.caseSrv.nzUploadHandleChange,
            spanLabel: 3,
            listType: 'picture-card',
            spanControl: 21,
            grid: {
              span: 24
            }
          }
        },
        login_username: {
          type: 'string',
          title: '登录名',
          minLength: 1,
          ui: {
            widget: 'string',
            spanLabel: 3,
            spanControl: 21,
            styleControl: { 'width': '60%' },
            grid: {
              span: 24
            }
          }
        },
        login_pwd: {
          type: 'string',
          title: '密码',
          minLength: 1,
          ui: {
            type: 'password',
            widget: 'string'
          }
        },
        login_pwd2: {
          type: 'string',
          title: '确认密码',
          minLength: 1,
          ui: {
            type: 'password',
            widget: 'string',
            validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
              if (form && form.value) {
                return form.value.login_pwd == value ? [] : [{ keyword: 'required', message: '二次密码输入的不一致！' }];
              } else {
                return [{ keyword: 'required', message: '请确认密码！' }];
              }
            }
          }
        },
        true_name: {
          type: 'string',
          title: '真实姓名',
          minLength: 1,
          ui: {
            widget: 'string',
          }
        }
      },
      required: ['login_username', 'login_pwd', 'login_pwd2', 'true_name'],
      ui: {
        spanLabel: 6,
        spanControl: 18,
        grid: {
          span: 12
        }
      }
    };

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
            text: '查看',
            type: 'modal',
            component: AccountShowComponent,
            params: this.formatModalParams.bind(this),
          },
          {
            text: '操作', children: [
              {
                text: '编辑',
                type: 'modal',
                component: AccountEditComponent,
                params: this.formatModalParams.bind(this),
                click: (record, btnRes) => { }
              },
              {
                text: '删除', click: (record, btnRes) => this.caseSrv.deleteAlert(null, record).then((res) => {
                  if (res.dismiss && res.dismiss == 'cancel') {
                    //
                  } else {
                    this.st.reload();
                  }
                  console.log(res);
                }).catch(console.error)
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
    const ms = this.modalSrv
      .static(AccountEditComponent, this.formatModalParams());
    console.log(ms);
    ms.subscribe((result) => {
      console.log(result);
      this.st.load();
      this.noticeSrv.msg_info('回调，重新发起列表刷新');
    });

  }

  add2() {
    this.modalSrv
      .static(AccountShowComponent, this.formatModalParams())
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
