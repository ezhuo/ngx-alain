import {
  Component,
  ViewChild,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { STComponent } from '@delon/abc';
import { SFComponent } from '@delon/form';
import { STColumnButton, STColumn } from '@delon/abc';
import { IndexControl } from '@core';
import { OrgInfoEditComponent } from './modal/edit.component';
import { OrgInfoShowComponent } from './modal/show.component';
import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-base-orgInfo',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgInfoComponent extends IndexControl implements OnInit {
  @ViewChild('st')
  st: STComponent;
  @ViewChild('sf')
  sf: SFComponent;
  @ViewChild('tree')
  tree: NzTreeComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this, {
      url: '/orginfo',
      key: 'org_id',
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getTreeData();

    this.schemaData = {
      search: {
        properties: {
          '%org_name%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '机构名称',
              width: 120,
            },
          },
          '%linkman%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '联系人',
              width: 120,
            },
          },
          status: {
            type: 'string',
            title: '',
            enum: this.stateSrv.sysDicDicUnshift('status_0_1', {
              label: '请选择',
              value: '',
            }),
            default: '',
          },
        },
        ui: {},
      },

      edit: {
        properties: {
          logo: {
            type: 'string',
            title: 'logo',
            format: 'uri',
            ui: {
              widget: 'uploadx',
              action: this.configSrv.api.upload,
              change: this.appCase.nzUploadHandleChange,
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
          parent_org_name: {
            type: 'string',
            title: '上级机构',
            ui: {
              widget: 'text',
            },
          },
          is_group: {
            type: 'string',
            title: '集团',
            enum: this.stateSrv.sysDicDicFormatNumber('yes_no'),
            default: 0,
            ui: {
              widget: 'radio',
            },
          },
          org_name: {
            type: 'string',
            title: '企业简称',
            minLength: 1,
            ui: {
              widget: 'string',
              autofocus: true,
            },
          },
          org_corpname: {
            type: 'string',
            title: '企业全称',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          linkman: {
            type: 'string',
            title: '联系人',
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
          tel: {
            type: 'string',
            title: '电话',
            ui: {
              widget: 'string',
            },
          },
          email: {
            type: 'string',
            title: 'email',
            ui: {
              widget: 'string',
            },
          },
          address: {
            type: 'string',
            title: '地址',
            ui: {
              widget: 'string',
              spanLabel: 3,
              spanControl: 21,
              grid: {
                span: 24,
              },
            },
          },
          canton_fdn: {
            type: 'string',
            title: '所在区域',
            ui: {
              widget: 'cascader',
              spanLabel: 3,
              spanControl: 21,
              changeOnSelect: true,
              asyncData: node => {
                return this.appCase.nzCascaderLoadDataBySchema(node);
              },
              grid: {
                span: 24,
              },
            },
          },
          files: {
            type: 'string',
            title: '附件',
            ui: {
              widget: 'uploadx',
              multiple: true,
              action: this.configSrv.api.upload,
              change: this.appCase.nzUploadHandleChange,
              spanLabel: 3,
              spanControl: 21,
              debug: true,
              grid: {
                span: 24,
              },
            },
          },
          memo: {
            type: 'string',
            title: '备注',
            minLength: 1,
            ui: {
              widget: 'ckeditor',
              spanLabel: 3,
              spanControl: 21,
              config: this.configSrv.ckeditor,
              grid: {
                span: 24,
              },
            },
          },
          status: {
            type: 'number',
            title: '状态',
            enum: this.stateSrv.sysDicDicFormatNumber('status_0_1'),
            default: 1,
            ui: {
              widget: 'radio',
            },
          },
        },
        required: ['org_name', 'org_corpname', 'phone'],
        ui: {
          spanLabel: 6,
          spanControl: 18,
          grid: {
            span: 12,
          },
        },
      },
    };

    this.tableData.col = [
      { title: '简称', index: 'org_name', width: '100px' },
      { title: '全称', index: 'org_corpname', width: '100px' },
      { title: '联系人', index: 'linkman' },
      { title: '手机', index: 'phone' },
      { title: '电话', index: 'tel' },
      { title: 'EMAIL', index: 'email' },
      { title: '联系地址', index: 'address' },
      // { title: '所属区域', index: 'canton_text_name' },
      {
        title: '状态',
        index: 'state_str',
        width: '60px',
        format: (item: any, col: any) => {
          return this.stateSrv.getSysDicDicLabel('status_0_1', item['status']);
        },
      },
      {
        title: '操作',
        width: '110px',
        fixed: 'right',
        buttons: [
          {
            text: '查看',
            type: 'modal',
            modal: this.modalTable(OrgInfoShowComponent),
          },
          {
            text: '操作',
            iif: (item: any, btn: STColumnButton, column: STColumn): any => {
              return this.userSrv.userInfo['is_group'];
            },
            children: [
              {
                text: '编辑',
                type: 'modal',
                modal: this.modalTable(OrgInfoEditComponent),
                click: (record, btnRes) => {
                  if (btnRes) this.refresh();
                },
              },
              {
                text: '删除',
                click: (record, btnRes) =>
                  this.appCase
                    .deleteAlert(null, record)
                    .then(res => {
                      if (res.dismiss && res.dismiss == 'cancel') {
                      } else {
                        this.refresh();
                      }
                    })
                    .catch(console.error),
              },
            ],
          },
        ],
      },
    ];
  }

  add() {
    this.treeSelectNodeEvent();
    this.freeData.add = this.modalEditStatic(OrgInfoEditComponent).subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
    );
  }

  treeData = [];
  treeDataExpandKeys = [];
  treeDataSelectKeys = [];
  getTreeData() {
    if (this.freeData.company) {
      this.freeData.company.unsubscribe();
    }
    this.freeData.company = this.httpSrv
      .get('/orginfo/tree')
      .subscribe((result: any) => {
        result.data.list.forEach((node, idx) => {
          this.treeData = [];
          this.treeDataExpandKeys = [];
          this.treeDataSelectKeys = [];
          if (idx === 0) {
            this.treeDataExpandKeys.push(node.key);
            this.treeDataSelectKeys.push(node.key);
          }
          this.treeData.push(new NzTreeNode(node));
        });
        this.detectChanges();
      });
  }

  mouseTreeAction(name: string, event: NzFormatEmitEvent): void {
    this.treeSelectNodeEvent(event.node);
  }

  treeSelectNodeEvent(node?: NzTreeNode) {
    if (!node) {
      // 获取选中节点数组中，最后一个
      const sel = this.tree.getSelectedNodeList();
      if (sel.length > 0) node = sel[sel.length - 1];
    }

    if (node) {
      this.modalData.data = node;
      this.sf.value['org_fdn%'] = node.key;
    }

    this.searchSubmit(this.st, this.sf.value);
    this.detectChanges();
  }

  refresh() {
    this.st.load();
    this.getTreeData();
  }
}
