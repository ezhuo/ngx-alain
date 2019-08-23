import { SchemaShowComponent } from './modal/show.component';
import { SchemaEditComponent } from './modal/edit.component';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import {
  Component,
  ViewChild,
  Injector,
  TemplateRef,
  HostListener,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { STComponent, STColumn } from '@delon/abc';

import { SchemaFormEditComponent } from './edit/edit.component';
import { SchemaFormEditxComponent } from './editx/edit.component';

import { IndexControl } from '@core';
import { of } from 'rxjs';
import {
  NzDropdownService,
  NzFormatEmitEvent,
  NzTreeNode,
  NzDropdownContextComponent,
} from 'ng-zorro-antd';

@Component({
  selector: 'com-account',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SchemaDemoComponent extends IndexControl implements OnInit {
  @ViewChild('st', { static: true })
  st: STComponent;

  // fileList = [];
  fileList2 = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: '/file/show/2018-08-05/1533467890_207681697.jpeg',
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ];

  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];

  previewImage = '';
  previewVisible = false;

  url = '/assets/tmp/pois.json';

  // public values: any[] = ['zhejiang', 'hangzhou', 'xihu'];
  public values: any[] = [
    '0003520.0000043.',
    '0003520.0000043.0000085.',
    '0003520.0000043.0000085.0000088.',
    '0003520.0000043.0000085.0000088.0006598.',
  ];

  dropdown: NzDropdownContextComponent;
  activedNode: NzTreeNode;

  constructor(
    protected injector: Injector,
    private nzDropdownService: NzDropdownService,
  ) {
    super(injector);

    this.tableParams.s = '';
    this.tableData.col = [
      this.configSrv.define.tableIndexColumn,
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
            component: SchemaEditComponent,
            paramName: 'i',
            click: () => this.noticeSrv.msgInfo('回调，重新发起列表刷新'),
          },
          {
            text: '图片',
            click: () => this.noticeSrv.msgInfo('click photo'),
          },
          {
            text: '更多',
            children: [
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
              {
                text: '经营SKU',
                click: () => this.noticeSrv.msgInfo('click sku'),
              },
            ],
          },
        ],
      },
      {
        title: '自定义',
        render: 'custom',
      },
    ];

    this.schemaData.edit = {
      properties: {
        email: {
          type: 'string',
          title: '邮箱',
          format: 'email',
        },
        name: {
          type: 'string',
          title: '姓名',
          minLength: 5,
        },
        age: {
          type: 'number',
          title: '年龄',
          minLength: 5,
          minimum: 18,
          maximum: 50,
          default: 25,
        },
        yesOrNot: {
          type: 'boolean',
          title: '允许售卖',
          default: true,
          ui: {
            enum: [{ label: '否', value: false }, { label: '是', value: true }],
          },
        },
        agree: {
          type: 'boolean',
          title: '同意《用户协议》',
          ui: 'checkbox',
        },
        birthday: {
          type: 'number',
          title: '生日',
          format: 'date',
        },
        status: {
          type: 'string',
          title: '状态',
          enum: [
            { label: '待支付', value: 'WAIT_BUYER_PAY' },
            { label: '已支付', value: 'TRADE_SUCCESS' },
            { label: '交易完成', value: 'TRADE_FINISHED' },
          ],
          default: 'WAIT_BUYER_PAY',
        },
        remark: {
          type: 'string',
          title: '描述',
          ui: {
            widget: 'textarea',
            autosize: true,
          },
        },
        file: {
          type: 'string',
          title: '附件',
          format: 'uri',
          ui: {
            widget: 'uploadx',
            action: this.configSrv.api.upload,
            change: this.appCase.nzUploadHandleChange,
            options: {
              avatar: true,
            },
          },
        },
        geo: {
          type: 'string',
          title: '所在地',
          default: [
            '0003520.0000043.',
            '0003520.0000043.0000085.',
            '0003520.0000043.0000085.0000088.',
            '0003520.0000043.0000085.0000088.0006598.',
          ],
          ui: {
            widget: 'cascader',
            changeOnSelect: true,
            asyncData: node => {
              return this.appCase.nzCascaderLoadDataBySchema(node);
            },
            spanLabel: 2,
            spanControl: 22,
            grid: {
              span: 24,
            },
          },
        },
        range: {
          type: 'number',
          title: '范围',
          default: 10,
          ui: {
            widget: 'slider',
          },
        },
        gender: {
          type: 'string',
          title: '性别',
          enum: ['Men', 'Women'],
          ui: {
            widget: 'radio',
            styleType: 'button',
          },
        },
        like: {
          type: 'string',
          title: '兴趣',
          enum: [
            { value: 1, label: '电影' },
            { value: 2, label: '书' },
            { value: 3, label: '旅行' },
          ],
          default: 2,
          ui: {
            widget: 'tag',
          },
        },
        roles: {
          type: 'number',
          title: '角色',
          enum: [
            {
              title: 'DNS管理',
              value: 10,
            },
            {
              title: 'ECS管理',
              value: 11,
            },
            {
              title: 'OSS管理',
              value: 12,
            },
            {
              title: 'RDS管理',
              value: 13,
            },
          ],
          ui: {
            widget: 'transfer',
            titles: ['未拥有', '已拥有'],
            spanLabel: 4,
            spanControl: 20,
            grid: {
              span: 24,
            },
          },
          default: [11, 12],
        },
        product: {
          type: 'array',
          title: '产品清单',
          maxItems: 5,
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: '名称',
              },
              price: {
                type: 'number',
                title: '单价',
                minimum: 1,
              },
            },
            required: ['name', 'price'],
            ui: {
              spanLabel: 5,
              spanControl: 19,
            },
          },
          ui: {
            grid: { span: 24, arraySpan: 12 },
          },
        },
        content: {
          type: 'string',
          title: '内容',
          ui: {
            widget: 'ckeditor',
            grid: { span: 24 },
            config: this.configSrv.ckeditor,
          },
        },
      },
      required: ['email', 'name'],
      ui: {
        spanLabel: 4,
        spanControl: 20,
        grid: {
          span: 12,
        },
      },
    };
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this.tableParams);
  }

  addGroup() {
    this.modalSrv
      .static(SchemaFormEditComponent, { i: { id: 0 }, pp: this })
      .subscribe(() => {
        this.noticeSrv.msgInfo('回调，重新发起列表刷新');
      });
  }

  addNgModel() {
    this.modalSrv
      .static(SchemaFormEditxComponent, { i: { id: 0 }, pp: this })
      .subscribe(() => {
        this.noticeSrv.msgInfo('回调，重新发起列表刷新');
      });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  addShow() {
    this.form.data = {
      email: 'aa@163.com',
      agree: '同意',
      content: `<p>民进党创党后，早期涉及&ldquo;国家定位&rdquo;、&ldquo;主权立场&rdquo;的论述，主要是依据1991年的&ldquo;台独党纲&rdquo;。直到1995年5月8日召开党代会，为了替陈水扁参选台湾地区领导人解套，通过&ldquo;台湾前途决议文&rdquo;，形同冻结&ldquo;台独党纲&rdquo;，民进党得以向中间路线靠拢，也成为民进党首次赢得台湾地区领导人选举的关键。</p>
      <p><img alt="" height="443" src="http://p0.ifengimg.com/pmop/2018/0807/C54D929691B999B07543103B21DF901343B9350C_size95_w1049_h774.jpeg" width="600" /></p>
      `,
    };
    this.modalEditStatic(SchemaShowComponent).subscribe(() => {
      this.noticeSrv.msgInfo('回调，重新发起列表刷新');
    });
  }

  addEdit() {
    this.form.data = {
      pkId: 1,
      email: 'aa@163.com',
      content: 'fdasfdas',
    };
    this.modalEditStatic(SchemaEditComponent).subscribe(() => {
      this.noticeSrv.msgInfo('回调，重新发起列表刷新');
    });
  }

  html = ``;

  public onChanges(values: any): void {
    // console.log(values, this.values);
  }

  expandKeys = ['1001', '10001'];
  checkedKeys = ['100011', '1002'];
  selectedKeys = ['10001', '100011'];
  expandDefault = false;

  public nodes2 = [
    new NzTreeNode({
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              isLeaf: true,
            },
            {
              title: 'child1.2',
              key: '100012',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'child2',
          key: '10002',
          children: [
            {
              title: 'grandchild1.2.1',
              key: '1000121',
              isLeaf: true,
              disabled: true,
            },
            {
              title: 'grandchild1.2.2',
              key: '1000122',
              isLeaf: true,
            },
          ],
        },
      ],
    }),
  ];

  mouseAction(name: string, event: NzFormatEmitEvent): void {
    console.log(name, event);
  }

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.activedNode = null;
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
  }

  contextMenu(
    $event: MouseEvent,
    template: TemplateRef<void>,
    node: NzTreeNode,
  ): void {
    console.log($event, node);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  contextMenu2 = (
    $event: any,
    template: TemplateRef<void>,
  ): EventEmitter<NzFormatEmitEvent> => {
    console.log($event);
    this.dropdown = this.nzDropdownService.create($event.event, template);
    return null;
  };

  selectDropdown(): void {
    this.dropdown.close();
    // do something
    console.log('dropdown clicked');
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeave(event: MouseEvent): void {
    event.preventDefault();
    // if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
    //   this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    // }
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(): void {
    // do not prevent
    // if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
    //   this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    // }
  }
}
