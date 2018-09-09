import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptionsForService, NzModalService } from 'ng-zorro-antd';
import { ModalHelper, ModalHelperOptions } from '@delon/theme';

/**
 * 对话框辅助类
 */
@Injectable()
export class ModalService {
    constructor(
        private modalHelper: ModalHelper,
        private nzModalSrv: NzModalService,
    ) {}

    create(
        comp: any,
        params?: any,
        options?: ModalHelperOptions,
    ): Observable<any> {
        return this.modalHelper.create(comp, params, options);
    }
    /**
     * 打开对话框
     * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
     *
     * 对于组件的成功&关闭的处理说明：
     * 成功：
     *  this.NzModalRef.close(data);
     *  this.NzModalRef.close();
     *
     * 关闭：
     * this.NzModalRef.destroy();
     *
     * @param comp 组件
     * @param params 组件参数
     * @param size 大小；例如：lg、600，默认：lg
     * @param options 对话框 `ModalOptionsForService` 参数
     */
    open(
        comp: any,
        params?: any,
        size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
        options?: ModalOptionsForService,
    ): Observable<any> {
        return this.modalHelper.open(
            comp,
            params,
            size,
            Object.assign(
                {
                    nzStyle: { top: '20px' },
                },
                options,
            ),
        );
    }

    /**
     * 静态框，点击蒙层不允许关闭
     */
    static(
        comp: any,
        params?: any,
        size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
        options?: any,
    ): Observable<any> {
        return this.open(
            comp,
            params,
            size,
            Object.assign(
                {
                    nzMaskClosable: false,
                },
                options,
            ),
        );
    }

    closeAll() {
        return this.nzModalSrv.closeAll();
    }
}
