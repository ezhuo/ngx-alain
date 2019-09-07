import {
  Component,
  ViewChild,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { STComponent } from '@delon/abc';
import { FormProperty, PropertyGroup, SFComponent } from '@delon/form';
import { IndexControl } from '@core';
import { AccountEditComponent } from './modal/edit.component';
import { AccountShowComponent } from './modal/show.component';
import { AccountPwdComponent } from './modal/pwd.component';
import { JsTreeOptions } from '@shared';

const changeDetection = ChangeDetectionStrategy.Default;

@Component({
  selector: 'app-system-account',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection,
})
export class AccountComponent extends IndexControl implements OnInit {
  @ViewChild('st', { static: true }) st: STComponent;
  @ViewChild('sf', { static: true }) sf: SFComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(
      this,
      { url: '/account', key: 'account_id' },
      { changeDetection },
    );
  }

  ngOnInit() {
    super.ngOnInit();

    this.schemaData = {
      // 查询
      search: {
        properties: {
          '%login_username%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '登录名',
              width: 120,
            },
          },
          '%true_name%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '姓名',
              width: 120,
            },
          },
          status: {
            type: 'string',
            title: '',
            enum: this.stateSrv.sysDicDicUnshift('account_status', {
              label: '请选择',
              value: '',
            }),
            default: '',
          },
        },
        ui: {},
      },

      // 新增
      edit: {
        properties: {
          images: {
            type: 'string',
            title: '照片',
            format: 'uri',
            ui: {
              widget: 'uploadx',
              urlReName: 'url',
              action: this.configSrv.api.upload,
              change: this.nzUploadHandleChange,
              spanLabel: 3,
              spanControl: 21,
              grid: {
                span: 24,
              },
              options: {
                avatar: true,
              },
            },
          },
          login_username: {
            type: 'string',
            title: '登录名',
            minLength: 1,
            ui: {
              widget: 'string',
              autofocus: true,
            },
          },
          org_id: {
            type: 'string',
            title: '所属公司',
            minLength: 1,
            ui: {
              widget: 'texts',
            },
          },
          login_pwd: {
            type: 'string',
            title: '密码',
            minLength: 1,
            ui: {
              type: 'password',
              widget: 'string',
            },
          },
          login_pwd2: {
            type: 'string',
            title: '确认密码',
            minLength: 1,
            ui: {
              type: 'password',
              widget: 'string',
              validator: (
                value: any,
                formProperty: FormProperty,
                form: PropertyGroup,
              ) => {
                if (form && form.value) {
                  return form.value.login_pwd == value
                    ? []
                    : [
                        {
                          keyword: 'required',
                          message: '二次密码输入的不一致！',
                        },
                      ];
                } else {
                  return [
                    {
                      keyword: 'required',
                      message: '请确认密码！',
                    },
                  ];
                }
              },
            },
          },
          true_name: {
            type: 'string',
            title: '真实姓名',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          phone: {
            type: 'string',
            title: '手机',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          email: {
            type: 'string',
            title: 'email',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          role_id: {
            type: 'string',
            title: '所属角色',
            minLength: 1,
            ui: {
              widget: 'select',
              asyncData: res => {
                return this.httpSrv.getOfDict('/role/dict');
              },
            },
          },
          status: {
            type: 'number',
            title: '用户状态',
            minLength: 1,
            enum: this.stateSrv.sysDicDicFormatNumber('account_status'),
            default: 10,
            ui: {
              widget: 'radio',
            },
          },
        },
        required: [
          'login_username',
          'login_pwd',
          'login_pwd2',
          'true_name',
          'role_id',
        ],
        ui: {
          spanLabel: 6,
          spanControl: 18,
          grid: {
            span: 12,
          },
        },
      },

      // 密码
      password: {
        properties: {
          login_username: {
            type: 'string',
            title: '登录名',
            minLength: 1,
            ui: {
              widget: 'text',
            },
          },
          true_name: {
            type: 'string',
            title: '真实姓名',
            minLength: 1,
            ui: {
              widget: 'text',
            },
          },
          login_pwd: {
            type: 'string',
            title: '新密码',
            minLength: 1,
            ui: {
              widget: 'text',
            },
          },
        },
        ui: {
          spanLabel: 6,
          spanControl: 18,
          grid: {
            span: 24,
          },
        },
      },
    };

    this.tableData.col = [
      this.configSrv.define.tableIndexColumn,
      { title: '登录名', index: 'login_username', width: '100px' },
      { title: '真实姓名', index: 'true_name' },
      { title: '角色', index: 'role_name' },
      { title: '机构', index: 'org_name' },
      { title: '手机', index: 'tel' },
      { title: '联系地址', index: 'address' },
      {
        title: '状态',
        index: 'state_str',
        width: '100px',
        format: (item: any, col: any) => {
          return this.stateSrv.getSysDicDicLabel(
            'account_status',
            item['status'],
          );
        },
      },
      {
        title: '操作',
        width: '180px',
        fixed: 'right',
        buttons: [
          {
            text: '查看',
            type: 'modal',
            modal: this.modalTable(AccountShowComponent),
          },
          {
            text: '操作',
            children: [
              {
                text: '编辑',
                type: 'modal',
                modal: this.modalTable(AccountEditComponent),
                click: (record, btnRes) => {
                  console.log(btnRes);
                  if (btnRes) this.st.reload();
                },
              },
              {
                text: '重置密码',
                type: 'modal',
                schema: this.schemaData.password,
                modal: this.modalTable(AccountPwdComponent),
                click: (record, btnRes) => {
                  if (btnRes) this.st.load();
                },
                iif: (item: any, btn: any, col: any): any => {
                  return this.userSrv.userInfo['admin'];
                },
              },
              {
                text: '删除',
                click: (record, btnRes) =>
                  this
                    .deleteAlert(null, record)
                    .then(res => {
                      if (res.dismiss && res.dismiss == 'cancel') {
                        //
                      } else {
                        this.st.reload();
                      }
                      // console.log(res);
                    })
                    .catch(console.error),
                iif: (item: any, btn: any, col: any): any => {
                  return item.account_id != this.userSrv.userInfo.id;
                },
              },
            ],
          },
        ],
      },
    ];
  }

  add($event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (!this.form.data) {
      this.noticeSrv.sweet.alert('请提前选择左边的目录树！');
      return false;
    }
    this.freeData.add = this.modalEditStatic(AccountEditComponent).subscribe(
      result => {
        if (result) {
          this.st.load();
        }
      },
    );
  }

  treeSelectNodeEvent(node?: any) {
    if (node) {
      this.modalData.data = {
        origin: node.original,
      };
      this.sf.value['org_fdn%'] = node.original.key;
    } else {
      this.modalData.data = {
        origin: {
          title: this.userSrv.userInfo.org_name,
          key: this.userSrv.userInfo.org_fdn,
          org_id: this.userSrv.userInfo.org_id,
        },
      };
    }

    this.searchSubmit(this.st, this.sf.value);
    this.detectChanges();
  }

  jstree: JsTreeOptions = {
    data: '/orginfo/tree',
    isOpenAll: false,
  };

  jstreeChange($event) {
    this.treeSelectNodeEvent($event);
  }
}
