import {
    Component,
    ViewChild,
    Injector,
    OnInit,
    OnDestroy,
} from '@angular/core';

import { SimpleTableComponent } from '@delon/abc';
import { SFComponent } from '@delon/form';

import { ParentIndexControl } from '@core';

import { AccountEditComponent } from './modal/edit.component';
import { AccountShowComponent } from './modal/show.component';
import { AccountPwdComponent } from './modal/pwd.component';

import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';

import { FormProperty, PropertyGroup } from '@delon/form';

import { SFSchema } from '@delon/form';

@Component({
    selector: 'app-system-account',
    templateUrl: `./index.component.html`,
    styleUrls: [`./index.component.less`],
})
export class AccountComponent extends ParentIndexControl
    implements OnInit, OnDestroy {
    @ViewChild('st')
    st: SimpleTableComponent;
    @ViewChild('sf')
    sf: SFComponent;
    @ViewChild('tree')
    tree: NzTreeComponent;

    constructor(protected injector: Injector) {
        super(injector);
        super.__init('/account', 'account_id');
    }

    protected passwordSchema: SFSchema = {
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
    };

    ngOnInit() {
        super.ngOnInit();
        this.gettreeData();

        this.searchSchema = {
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
        };

        this.mainSchema = {
            properties: {
                images: {
                    type: 'string',
                    title: '照片',
                    format: 'uri',
                    ui: {
                        widget: 'uploadx',
                        action: this.configSrv.api.upload,
                        change: this.caseFunc.nzUploadHandleChange,
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
                        autofocus: 'autofocus',
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
        };

        this.mainTableColumns = [
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
                        component: AccountShowComponent,
                        params: this.formatModalParams.bind(this),
                    },
                    {
                        text: '操作',
                        children: [
                            {
                                text: '编辑',
                                type: 'modal',
                                component: AccountEditComponent,
                                params: this.formatModalParams.bind(this),
                                click: (record, btnRes) => {
                                    console.log(btnRes);
                                    if (btnRes) this.st.load();
                                },
                            },
                            {
                                text: '重置密码',
                                type: 'modal',
                                schema: this.passwordSchema,
                                component: AccountPwdComponent,
                                params: (record?: any): Object => {
                                    return this.formatModalParams.call(
                                        this,
                                        record,
                                        {
                                            schema: this.passwordSchema,
                                        },
                                    );
                                },
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
                                    this.caseFunc
                                        .deleteAlert(null, record)
                                        .then(res => {
                                            if (
                                                res.dismiss &&
                                                res.dismiss == 'cancel'
                                            ) {
                                                //
                                            } else {
                                                this.st.reload();
                                            }
                                            // console.log(res);
                                        })
                                        .catch(console.error),
                                iif: (item: any, btn: any, col: any): any => {
                                    return (
                                        item.account_id !=
                                        this.userSrv.userInfo.id
                                    );
                                },
                            },
                        ],
                    },
                ],
            },
        ];
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    add() {
        this.treeSelectNodeEvent();
        this.freeData.add = this.modalSrv
            .static(AccountEditComponent, this.formatModalParams())
            .subscribe(result => {
                if (result) {
                    this.st.load();
                }
            });
    }

    treeData = [];
    treeDataExpandKeys = [];
    treeDataSelectKeys = [];
    gettreeData() {
        this.freeData.company = this.httpSrv
            .get('/orginfo/tree')
            .subscribe((result: any) => {
                result.data.list.forEach((node, idx) => {
                    console.log(idx);
                    if (idx === 0) {
                        this.treeDataExpandKeys.push(node.key);
                        this.treeDataSelectKeys.push(node.key);
                    }
                    this.treeData.push(new NzTreeNode(node));
                });
            });
    }

    mouseTreeAction(name: string, event: NzFormatEmitEvent): void {
        this.treeSelectNodeEvent(event.node);
    }

    treeSelectNodeEvent(node?: NzTreeNode) {
        if (!node && this.tree) {
            // 获取选中节点数组中，最后一个
            const sel = this.tree.getSelectedNodeList();
            if (sel.length > 0) node = sel[sel.length - 1];
        }
        if (node) {
            this.modalParams.tree = node;
            this.sf.value['org_fdn%'] = node.key;
        } else {
            this.modalParams.tree = {
                origin: {
                    title: this.userSrv.userInfo.org_name,
                    key: this.userSrv.userInfo.org_fdn,
                    org_id: this.userSrv.userInfo.org_id,
                },
            };
        }

        this.searchSubmit(this.st, this.sf.value);
    }
}
