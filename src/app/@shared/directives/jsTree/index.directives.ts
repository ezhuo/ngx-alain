import {
  Directive,
  Input,
  Output,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { HttpService, helpers, NoticeService } from '@core';

export interface JsTreeOptions {
  type?: 'view' | 'edit';
  data?: string | any[];
  event_loaded?: any;
  clickNode?: any;
  isDestroy?: boolean;
  isOpenAll?: boolean;
  isFirstNodeSelect?: boolean;
  eventLoaded?: any;
}

@Directive({ selector: '[jstree]' })
export class JsTreeDirective implements OnInit, OnDestroy, OnChanges {
  op: JsTreeOptions = {};
  data$: any = {};
  $container: any;
  private sweet: any;
  private jstreeObj = null;

  @Input('jstree')
  treeData: any;

  @Output('jstreeChange')
  jstreeChange = new EventEmitter<any>();

  constructor(
    private eleRef: ElementRef,
    private msgService: NoticeService,
    private http: HttpService,
  ) {
    this.$container = $(this.eleRef.nativeElement);
    this.sweet = this.msgService.sweet;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.treeData.currentValue)
      this.tree_init(changes.treeData.currentValue);
  }

  ngOnDestroy() {
    if (this.data$) {
      for (const item in this.data$) {
        if (this.data$[item]) {
          this.data$[item].unsubscribe();
          this.data$[item] = null;
        }
      }
    }
  }

  tree_init(op: JsTreeOptions) {
    op.type = op.type || 'view'; // 默认是查看
    op.data = op.data || [];
    op.isDestroy = op.isDestroy === undefined ? true : false;
    op.isOpenAll = op.isOpenAll === undefined ? true : op.isOpenAll;
    op.isFirstNodeSelect = op.isFirstNodeSelect === undefined ? true : false;
    this.op = op;

    if (op.isDestroy && $.jstree) $.jstree.destroy();
    this.$container.empty();

    if (helpers.isArray(op.data) && op.data.length > 0) {
      this.jstreeObj = this.tree_initUI();
    } else if (helpers.isString(op.data)) {
      // 异步加载
      this.data$.get$ = this.http
        .get(<string>op.data)
        .subscribe((result: any) => {
          this.op.data = result.data.list;
          this.jstreeObj = this.tree_initUI();
        });
    }
    this.tree_event();
  }

  tree_initUI() {
    const self = this;
    let len = this.op.data.length;
    if (!len) {
      if (helpers.isObject(this.op.data)) {
        len = 1;
      }
    }
    if (len > 0) {
      if (helpers.isObject(this.op.data)) {
        this.op.data = [this.op.data];
      }
      this.op.data[0].state = this.op.data[0].state || {};
      this.op.data[0].state['opened'] = true;
      this.op.data[0].type = len > 1 ? 'opened' : 'root';
    }
    const jstree_op = {
      core: {
        strings: {
          'Loading ...': '正在加载中...',
        },
        themes: {
          responsive: false,
        },
        check_callback: true,
        data: self.op.data,
      },
      types: {
        root: {
          icon: 'iconfont icon-home icon-state-warning icon-lg',
        },
        default: {
          icon: 'iconfont icon-folder icon-state-warning icon-lg',
          valid_children: ['default', 'file', 'opened'],
        },
        opened: {
          icon: 'iconfont icon-folder-open icon-state-warning icon-lg',
        },
        file: {
          icon: 'iconfont icon-File icon-state-warning icon-lg',
          valid_children: [],
        },
      },
      plugins: ['types'],
      contextmenu: {
        items: node => {
          const o: any = {
            create: self.tree_reg('新增', function() {
              return self.tree_create(node);
            }),
          };
          if (node.parent !== '#') {
            o.rename = self.tree_reg('改名', function() {
              return self.tree_rename(node);
            });

            o.del = self.tree_reg('删除', function() {
              return self.tree_del(node);
            });
          }
          return o;
        },
      },
    };

    if (this.op.type !== 'view') {
      jstree_op.plugins.push('contextmenu');
    }

    return this.$container.jstree(jstree_op);
  }

  tree_event() {
    const self = this;

    this.$container.on('loaded.jstree', (e, data) => {
      // 全部展开
      if (self.op.isOpenAll) {
        self.$container.jstree('open_all');
      }
      // 第一个节点展开
      if (self.op.isFirstNodeSelect) {
        self.first_node_select(e, data);
      }
      if (self.op.event_loaded) {
        self.op.event_loaded(e, data);
      }
    });

    this.$container.on('select_node.jstree', (event, data) => {
      this.jstreeChange.emit(data.node);
      if (self.op.clickNode) {
        return self.op.clickNode(data.node);
      }
    });

    this.$container.on('open_node.jstree', (event, data) => {
      if (data.instance.get_type(data.node) != 'root') {
        data.instance.set_type(data.node, 'opened');
      }
    });
    this.$container.on('close_node.jstree', (event, data) => {
      if (data.instance.get_type(data.node) != 'root') {
        data.instance.set_type(data.node, 'default');
      }
    });
  }

  tree_reg(label, action) {
    return {
      label: label,
      action: action,
    };
  }

  tree_create(node) {
    const self = this;

    return this.sweet.prompt('新增').then(res => {
      if (res.dismiss === 'cancel') {
        return null;
      }
      if (!res.value) {
        this.msgService.msgError('请输入数据！');
        return null;
      }
      const data = {
        name: res.value,
        parent_id: node.id,
      };
      if (res.value) {
        this.data$.post$ = self.http.post(<string>self.op.data, data).subscribe(
          (result: any) => {
            result = result.data;
            if (typeof result !== 'object') {
              result = { info: result };
            }
            const jstree = self.$container.jstree(true);
            jstree.create_node(node.id, {
              text: res.value,
              id: result.result.canton_id,
            });
            jstree.open_node(node);
            return void 0;
          },
          (err: any) => {
            err = err.data;
            if (!err.message)
              self.msgService.msgError('操作失败，请稍候再试！');
            return void 0;
          },
        );
      }
    });
  }

  tree_rename(node) {
    const self = this;
    return self.sweet.prompt('改名', node.text).then(res => {
      if (res.dismiss === 'cancel') {
        return null;
      }
      if (!res.value || res.value == node.text) {
        this.msgService.msgError('请输入数据！');
        return null;
      }
      const data = {
        parent_id: node.parent,
        id: node.id,
        name: res.value,
      };
      if (res.value) {
        self.data$.put$ = self.http
          .put(<string>self.op.data + '/' + node.id, data)
          .subscribe(
            result => {
              return self.$container.jstree(true).set_text(node, res.value);
            },
            err => {
              if (!err.message)
                self.msgService.msgError('操作失败，请稍候再试！');
              return void 0;
            },
          );
      }
    });
  }

  tree_del(node) {
    const self = this;
    return this.sweet
      .confirm('确认要删除 [' + node.text + '] 及其子节点数据吗？')
      .then(res => {
        if (res.value)
          self.data$.del$ = self.http
            .delete(<string>self.op.data + '/' + node.id, { id: node.id })
            .subscribe(
              (result: any) => {
                result = result.data;
                self.$container.jstree(true).delete_node(node);
                return void 0;
              },
              err => {
                if (!err.message)
                  self.msgService.msgError('操作失败，请稍候再试！');
              },
            );
      });
  }

  getSelection($container = null) {
    if ($container) {
      return $($container)
        .jstree(true)
        .get_selected('full');
    } else {
      return this.$container.jstree(true).get_selected('full');
    }
  }

  first_node_select(e, data) {
    const inst = data.instance;
    const obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
    return inst.select_node(obj);
  }
}
