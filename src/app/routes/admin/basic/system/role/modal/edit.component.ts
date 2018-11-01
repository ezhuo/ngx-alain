import { Component, Injector, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ModalControl } from '@core';

import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';

@Component({
    selector: 'app-system-role-edit',
    templateUrl: `./edit.component.html`,
    styles: [``]
})
export class RoleEditComponent extends ModalControl implements OnInit, OnDestroy {

    @ViewChild('tree') tree: NzTreeComponent;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.gettreeData();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSubmit($event: any) {
        const formData = this.formatSubmitData($event.value, this.schemaData.main);
        const arr = this.stateSrv.arraySrv.getKeysByTreeNode(this.tree.getCheckedNodeList());
        formData['menu_ids'] = arr.join(',');
        const arr2 = this.stateSrv.arraySrv.getKeysByTreeNode(this.tree.getHalfCheckedNodeList());
        formData['menu_all_ids'] = this.helpers.arrayUnique(arr2.concat(arr)).join(',');
        this.httpSrv.update(this.primaryData.url, formData, this.primaryData.val).subscribe((result) => {
            // console.log(result);
            this.modalClose(result);
        });
    }

    treeData = [];
    treeDataExpandKeys = [];
    treeDataSelectKeys = [];
    treeDataCheckedKeys = [];
    gettreeData() {
        this.freeData.menu = this.httpSrv.post('/menu/get_menu_list', { 'role_id': this.primaryData.val }).subscribe((result: any) => {
            result.data.list.forEach((node, idx) => {
                // console.log(idx);
                // if (idx === 0) {
                //     this.treeDataExpandKeys.push(node.key);
                //     this.treeDataSelectKeys.push(node.key);
                // }
                this.treeData.push(new NzTreeNode(node));
            });

            this.treeDataCheckedKeys = result.data.sel;
        });
    }

}
