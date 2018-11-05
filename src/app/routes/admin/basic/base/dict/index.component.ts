import {
  Component,
  ViewChild,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { STComponent } from '@delon/abc';
import { SFComponent } from '@delon/form';

import { IndexControl } from '@core';

import { DictEditComponent } from './modal/edit.component';

@Component({
  selector: 'app-base-dict',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
})
export class DictComponent extends IndexControl implements OnInit, OnDestroy {
  @ViewChild('st')
  st: STComponent;

  dictActive = null;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init(
      '/' + this.activeRoute.routeConfig.data.url || '/dictdic',
      'dic_id',
    );
    this.tableParams.ps = 100;
  }

  dictTypeName = [];
  url = null;

  ngOnInit() {
    super.ngOnInit();

    this.schemaData.edit = {
      properties: {
        type_name: {
          type: 'string',
          title: '数据类别',
          minLength: 1,
          ui: {
            widget: 'texts',
          },
        },
        name: {
          type: 'string',
          title: '名称',
          minLength: 1,
          ui: {
            widget: 'string',
            autofocus: true,
          },
        },
        code: {
          type: 'string',
          title: '值',
          ui: {
            widget: 'string',
          },
        },
        order: {
          type: 'number',
          title: '排序',
          ui: {
            widget: 'string',
          },
        },
        memo: {
          type: 'string',
          title: '备注',
          ui: {
            widget: 'string',
          },
        },
      },
      required: ['name'],
      ui: {
        spanLabel: 6,
        spanControl: 18,
        grid: {
          span: 24,
        },
      },
    };

    this.tableData.col = [
      { title: '名称', index: 'name' },
      { title: '值', index: 'code' },
      { title: '排序', index: 'order' },
      { title: '备注', index: 'memo' },
      {
        title: '操作',
        width: '120px',
        fixed: 'right',
        buttons: [
          {
            text: '编辑',
            type: 'modal',
            component: DictEditComponent,
            modal: { size: 'md' },
            params: this.formatModalParams.bind(this),
            click: (record, btnRes) => {
              console.log(btnRes);
              if (btnRes) this.st.load();
            },
          },
          {
            text: '删除',
            click: (record, btnRes) =>
              this.appCase
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
          },
        ],
      },
    ];

    this.dictTypeList();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  add() {
    this.modalData.data = this.dictActive;
    this.freeData.add = this.modalSrv
      .static(DictEditComponent, this.formatModalParams(), 'md')
      .subscribe(result => {
        if (result) {
          this.st.load();
        }
      });
  }

  dictTypeList() {
    this.freeData.dictTypeList = this.httpSrv
      .get(this.dataSource.url + '/tree/0')
      .subscribe((result: any) => {
        let ac = { type: '-1' };
        if (result && result.data && result.data.list) {
          this.dictTypeName = result.data.list;
          if (result.data.list.length > 0) {
            ac = result.data.list[0];
          }
        }
        this.dictTypeClick(ac);
      });
  }

  dictTypeClick($value) {
    this.dictActive = $value;
    this.url = this.dataSource.url;
    this.tableParams.type = this.dictActive.type;
    this.st.reset();
  }
}
