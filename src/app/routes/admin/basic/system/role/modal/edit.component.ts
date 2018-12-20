import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalControl } from '@core';
import { NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: `./edit.component.html`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RoleEditComponent extends ModalControl
  implements OnInit, OnDestroy {
  @ViewChild('tree') tree: NzTreeComponent;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.gettreeData();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit($event: any) {
    const formData = this.appBase.__formatSubmitData(
      $event.value,
      this.schemaData.edit,
    );
    const arr = this.stateSrv.arraySrv.getKeysByTreeNode(
      this.tree.getCheckedNodeList(),
    );
    formData['menu_ids'] = arr.join(',');
    const arr2 = this.stateSrv.arraySrv.getKeysByTreeNode(
      this.tree.getHalfCheckedNodeList(),
    );
    formData['menu_all_ids'] = this.helpers
      .arrayUnique(arr2.concat(arr))
      .join(',');
    this.httpSrv
      .update(this.dataSource.url, formData, this.dataSource.val)
      .subscribe(result => {
        // console.log(result);
        this.modalClose(result);
      });
  }

  treeData = [];
  treeDataExpandKeys = [];
  treeDataSelectKeys = [];
  treeDataCheckedKeys = [];
  gettreeData() {
    this.freeData.menu = this.httpSrv
      .post('/menu/get_menu_list', { role_id: this.dataSource.val })
      .subscribe((result: any) => {
        result.data.list.forEach((node, idx) => {
          this.treeData.push(new NzTreeNode(node));
        });

        this.treeDataCheckedKeys = result.data.sel;
      });
  }
}
