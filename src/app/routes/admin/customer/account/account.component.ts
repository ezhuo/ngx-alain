import { NzModalService } from 'ng-zorro-antd';
import { Component, ViewChild, Injector, TemplateRef, HostListener, EventEmitter } from '@angular/core';
import { SimpleTableComponent, SimpleTableColumn } from '@delon/abc';

import { AccountEditComponent } from '@routes/admin/customer/account/edit/edit.component';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';

import { NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent } from 'ng-zorro-antd';

const provinces = [{
  value: 'zhejiang',
  label: 'Zhejiang'
}, {
  value: 'jiangsu',
  label: 'Jiangsu'
}];

const cities = {
  zhejiang: [{
    value: 'hangzhou',
    label: 'Hangzhou'
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
  jiangsu: [{
    value: 'nanjing',
    label: 'Nanjing'
  }]
};

const scenicspots = {
  hangzhou: [{
    value: 'xihu',
    label: 'West Lake',
    isLeaf: true
  }],
  nanjing: [{
    value: 'zhonghuamen',
    label: 'Zhong Hua Men',
    isLeaf: true
  }]
};

@Component({
  selector: 'com-account',
  templateUrl: './account.component.html',
})
export class AccountComponent extends ParentIndexComponent {
  @ViewChild('st') st: SimpleTableComponent;

  // fileList = [];
  fileList = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: '/file/show/2018-07-11/1531310501_43220052.jpeg'
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];

  s: any = {
    pi: 1,
    ps: 10,
    s: '',
  };
  url = '/assets/tmp/pois.json';
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
        {
          text: '更多', children: [
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
    {
      title: '自定义',
      render: 'custom'
    },
  ];


  // public values: any[] = ['zhejiang', 'hangzhou', 'xihu'];
  public values: any[] = ["0003520.0000043.", "0003520.0000043.0000085.", "0003520.0000043.0000085.0000088.", "0003520.0000043.0000085.0000088.0006598."];

  dropdown: NzDropdownContextComponent;
  activedNode: NzTreeNode;

  constructor(protected injector: Injector, private nzDropdownService: NzDropdownService) {
    super(injector);
    console.log(this.httpSrv);
  }

  get modalSrv2() {
    return this.injector.get(NzModalService);
  }

  add() {
    this.modalSrv
      .open(AccountEditComponent, { i: { id: 0 }, pp: this })
      .subscribe(() => {
        this.st.load();
        this.noticeSrv.msg_info('回调，重新发起列表刷新');
      });

    // this.modalSrv
    //   .static(AccountEditComponent, { i: { id: 0 }, pp: this })
    //   .subscribe(() => {
    //     this.st.load();
    //     this.noticeSrv.msg_info('回调，重新发起列表刷新');
    //   });
  }

  test(a) {
    console.log('b', a);
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
              isLeaf: true
            },
            {
              title: 'child1.2',
              key: '100012',
              isLeaf: true
            }
          ]
        },
        {
          title: 'child2',
          key: '10002',
          children: [
            {
              title: 'grandchild1.2.1',
              key: '1000121',
              isLeaf: true,
              disabled: true
            },
            {
              title: 'grandchild1.2.2',
              key: '1000122',
              isLeaf: true
            }
          ]
        }
      ]
    })
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

  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    debugger;
    console.log($event, node);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  contextMenu2 = ($event: any, template: TemplateRef<void>): EventEmitter<NzFormatEmitEvent> => {
    debugger;
    console.log($event);
    this.dropdown = this.nzDropdownService.create($event.event, template);
    return null;
  }

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
