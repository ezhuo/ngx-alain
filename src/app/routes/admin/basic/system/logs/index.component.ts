import {
  Component,
  ViewChild,
  Injector,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { STComponent } from '@delon/abc';
import { SFComponent } from '@delon/form';
import { IndexControl } from '@core';
import { LogsShowComponent } from './modal/show.component';

const changeDetection = ChangeDetectionStrategy.OnPush;
@Component({
  selector: 'app-system-logs',
  templateUrl: `./index.component.html`,
  styleUrls: [`./index.component.less`],
  changeDetection,
})
export class LogsComponent extends IndexControl implements OnInit {
  @ViewChild('st')
  st: STComponent;
  @ViewChild('sf')
  sf: SFComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(
      this,
      {
        url: this.activeRoute.routeConfig.data.url || '/logs',
        key: 'id',
      },
      { changeDetection },
    );
  }

  ngOnInit() {
    super.ngOnInit();

    this.schemaData = {
      search: {
        properties: {
          '%title%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '事件名称',
              width: 160,
            },
          },
          '%content%': {
            type: 'string',
            title: '',
            ui: {
              placeholder: '事件内容',
              width: 160,
            },
          },
          created_at: {
            type: 'string',
            title: '',
            ui: {
              placeholder: '时间',
              widget: 'date',
              mode: 'range',
              width: 250,
            },
          },
          source: {
            type: 'string',
            title: '',
            enum: this.stateSrv.sysDicDicUnshift('app_sys', {
              label: '请选择',
              value: '',
            }),
            default: '',
          },
          monitor: {
            type: 'string',
            title: '',
            enum: this.stateSrv.sysDicDicUnshift('app_monitor', {
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
          title: {
            type: 'string',
            title: '事件名称',
            ui: {
              widget: 'string',
            },
          },
          content: {
            type: 'string',
            title: '事件内容',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          ip: {
            type: 'string',
            title: 'ip地址',
            minLength: 1,
            ui: {
              widget: 'string',
            },
          },
          source: {
            type: 'string',
            title: '系统来源',
            minLength: 1,
            ui: {
              widget: 'string',
              enum: this.stateSrv.sysDicDic['app_sys'],
              spanLabel: 8,
              spanControl: 16,
              grid: {
                span: 12,
              },
            },
          },
          monitor: {
            type: 'string',
            title: '终端',
            minLength: 1,
            ui: {
              widget: 'string',
              enum: this.stateSrv.sysDicDic['app_monitor'],
              spanLabel: 8,
              spanControl: 16,
              grid: {
                span: 12,
              },
            },
          },
          creater_user_name: {
            type: 'string',
            title: '操作人',
            minLength: 1,
            ui: {
              widget: 'string',
              spanLabel: 8,
              spanControl: 16,
              grid: {
                span: 12,
              },
            },
          },
          created_at: {
            type: 'string',
            title: '操作时间',
            minLength: 1,
            ui: {
              widget: 'string',
              spanLabel: 8,
              spanControl: 16,
              grid: {
                span: 12,
              },
            },
          },
        },
        ui: {
          spanLabel: 4,
          spanControl: 20,
          grid: {
            span: 24,
          },
        },
      },
    };

    this.tableData.col = [
      this.configSrv.define.tableIndexColumn,
      { title: '事件名称', index: 'title', width: '180px' },
      { title: '事件内容', index: 'content' },
      {
        title: '系统',
        index: 'source_str',
        width: '100px',
        format: (item: any, col: any) => {
          return this.stateSrv.getSysDicDicLabel('app_sys', item['source']);
        },
      },
      {
        title: '终端',
        index: 'monitor_str',
        width: '100px',
        format: (item: any, col: any) => {
          return this.stateSrv.getSysDicDicLabel(
            'app_monitor',
            item['monitor'],
          );
        },
      },
      { title: 'IP', index: 'ip', width: '100px' },
      { title: '操作人', index: 'creater_user_name', width: '100px' },
      { title: '操作时间', index: 'created_at', width: '160px' },
      {
        title: '操作',
        width: '80px',
        fixed: 'right',
        buttons: [
          {
            text: '查看',
            type: 'modal',
            modal: this.modalTable(LogsShowComponent),
          },
        ],
      },
    ];
  }
}
