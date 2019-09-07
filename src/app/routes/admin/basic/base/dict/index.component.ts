import {
  Component,
  ViewChild,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { STComponent } from '@delon/abc';
import { IndexControl } from '@core';
import { DictEditComponent } from './modal/edit.component';

const changeDetection = ChangeDetectionStrategy.OnPush;

@Component({
  selector: 'app-base-dict',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection,
})
export class DictComponent extends IndexControl implements OnInit {
  @ViewChild('st', { static: true })
  st: STComponent;

  dictActive = null;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(
      this,
      {
        url: '/' + this.activeRoute.routeConfig.data.url || '/dictdic',
        key: 'dic_id',
      },
      { changeDetection },
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
          default: 100,
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
      Object.assign({}, this.configSrv.define.tableIndexColumn, { width: 80 }),
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
            modal: this.modalTable(DictEditComponent, { size: 'md' }),
            click: (record, btnRes) => {
              console.log(btnRes);
              if (btnRes) this.st.reload();
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
          },
        ],
      },
    ];

    this.dictTypeList();
  }

  add($event) {
if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.modalData.data = this.dictActive;
    this.freeData.add = this.modalEditStatic(
      DictEditComponent,
      null,
      'md',
    ).subscribe(result => {
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
    this.detectChanges();
  }
}
