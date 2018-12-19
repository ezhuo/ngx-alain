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

import { RoleEditComponent } from './modal/edit.component';

@Component({
  selector: 'app-system-role',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
})
export class RoleComponent extends IndexControl implements OnInit, OnDestroy {
  @ViewChild('st')
  st: STComponent;
  @ViewChild('sf')
  sf: SFComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init('/role', 'role_id');
  }

  ngOnInit() {
    super.ngOnInit();

    this.schemaData.search = {
      properties: {
        '%name%': {
          type: 'string',
          title: '',
          ui: {
            placeholder: '姓名',
            width: 120,
          },
        },
        level: {
          type: 'string',
          title: '',
          enum: this.stateSrv.sysDicDicUnshift('role_level', {
            label: '请选择',
            value: '',
          }),
          default: '',
        },
      },
      ui: {},
    };

    this.schemaData.edit = {
      properties: {
        name: {
          type: 'string',
          title: '角色',
          minLength: 1,
          ui: {
            widget: 'string',
            autofocus: true,
          },
        },
        level: {
          type: 'string',
          title: '级别',
          minLength: 1,
          enum: this.stateSrv.sysDicDic['role_level'],
          default: '1',
          ui: {
            widget: 'select',
          },
        },
        content: {
          type: 'string',
          title: '备注',
          minLength: 1,
          ui: {
            widget: 'string',
          },
        },
      },
      required: ['name', 'level'],
      ui: {
        spanLabel: 4,
        spanControl: 20,
        grid: {
          span: 24,
        },
      },
    };

    this.tableData.col = [
      { title: '名称', index: 'name' },
      {
        title: '状态',
        index: 'level_str',
        width: '100px',
        format: (item: any, col: any) => {
          return this.stateSrv.getSysDicDicLabel('role_level', item['level']);
        },
      },
      { title: '备注', index: 'content' },
      {
        title: '操作',
        width: '180px',
        fixed: 'right',
        buttons: [
          {
            text: '编辑',
            type: 'modal',
            modal: this.modalTable(RoleEditComponent),
            click: (record, btnRes) => {
              console.log(btnRes);
              if (btnRes) this.st.load();
            },
          },
          {
            text: '删除',
            click: (record, btnRes) => {
              if (record.role_id < 10) {
                this.sweetSrv.info('当前角色不允许删除！', 3000);
              } else
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
                  .catch(console.error);
            },
          },
        ],
      },
    ];
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  add() {
    this.freeData.add = this.modalEditStatic(RoleEditComponent).subscribe(
      result => {
        if (result) {
          this.st.load();
        }
      },
    );
  }
}
