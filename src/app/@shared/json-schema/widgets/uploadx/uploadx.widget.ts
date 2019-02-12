import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { deepGet } from '@delon/util';
import { UploadFile, UploadChangeParam, NzModalService } from 'ng-zorro-antd';
import { ControlWidget } from '@delon/form';
import { getData, toBool } from '@delon/form/src/utils';

@Component({
    selector: 'sf-uploadx',
    template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">

    <nz-upload
      [nzType]="i.type"
      [nzFileList]="fileList"
      [nzDisabled]="disabled"
      [nzAction]="i.action"
      [nzAccept]="i.accept"
      [nzLimit]="i.limit"
      [nzSize]="i.size"
      [nzFileType]="i.fileType"
      [nzHeaders]="ui.headers"
      [nzData]="ui.data"
      [nzListType]="i.listType"
      [nzMultiple]="i.multiple"
      [nzName]="i.name"
      [nzShowUploadList]="i.showUploadList"
      [nzWithCredentials]="i.withCredentials"
      [nzRemove]="ui.remove"
      [nzPreview]="handlePreview"
      (nzChange)="change($event)">
      <ng-container *ngIf="!avatar?.url ; else cross">
      <ng-container [ngSwitch]="btnType">
        <ng-container *ngSwitchCase="'plus'">
          <i nz-icon type="plus"></i>
          <div class="ant-upload-text" [innerHTML]="i.text"></div>
        </ng-container>
        <ng-container *ngSwitchCase="'drag'">
          <p class="ant-upload-drag-icon"><i nz-icon type="inbox"></i></p>
          <p class="ant-upload-text" [innerHTML]="i.text"></p>
          <p class="ant-upload-hint" [innerHTML]="i.hint"></p>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <button type="button" nz-button>
            <i nz-icon type="upload"></i><span [innerHTML]="i.text"></span>
          </button>
        </ng-container>
      </ng-container>
      </ng-container>
      <ng-template #cross>
        <div class="avatarbutton">
          <img [src]="avatar?.url" class="avatar" />
          <span class="ant-upload-list-item-actions avatar-action">
              <i (click)="handlePreview(avatar, $event)" nz-icon type="eye" title="查看"></i>
              &nbsp;&nbsp;
              <i (click)="handleRemove(avatar, $event)" nz-icon type="delete" title="删除"></i>
          </span>
        </div>  
      </ng-template>
    </nz-upload>

  </sf-item-wrap>
  `,
    preserveWhitespaces: false,
    styles: [
        `
            .avatarbutton {
                .avatar-action i {
                    margin-top: 10px;
                    font-size: 26px;
                }
            }
        `,
    ],
})
export class UploadxWidget extends ControlWidget implements OnInit {
    static readonly KEY = 'uploadx';
    i: any;
    fileList: UploadFile[] = [];
    btnType = '';
    avatar: any = null;

    // constructor(cd: ChangeDetectorRef, private modalSrv: NzModalService) {
    //     super(cd);
    // }

    get modalSrv() {
        return this.injector.get(NzModalService);
    }

    ngOnInit(): void {
        this.i = {
            type: this.ui.type || 'select',
            text: this.ui.text || '点击上传',
            action: this.ui.action || '',
            accept: this.ui.accept || '',
            limit: this.ui.limit == null ? 0 : +this.ui.limit,
            size: this.ui.size == null ? 0 : +this.ui.size,
            fileType: this.ui.fileType || '',
            listType: this.ui.listType || 'text',
            multiple: toBool(this.ui.multiple, false),
            name: this.ui.name || 'file',
            showUploadList: toBool(this.ui.showUploadList, true),
            withCredentials: toBool(this.ui.withCredentials, false),
            resReName: (this.ui.resReName || '').split('.'),
        };
        this.avatarInit();
        if (this.i.listType === 'picture-card') this.btnType = 'plus';
        if (this.i.type === 'drag') {
            this.i.listType = null;
            this.btnType = 'drag';
            this.i.text = this.ui.text || `单击或拖动文件到该区域上传`;
            this.i.hint =
                this.ui.hint ||
                `支持单个或批量，严禁上传公司数据或其他安全文件`;
        }
    }

    change(args: UploadChangeParam) {
        if (this.ui.change) this.ui.change(args);
        if (args.type !== 'success') return;
        this.notify(args.fileList);
    }

    reset(value: any) {
        getData(this.schema, this.ui, this.formProperty.formData).subscribe(
            list => {
                if (
                    !this.ui.enum &&
                    this.formProperty.formData &&
                    Array.isArray(this.formProperty.formData)
                ) {
                    list = this.formProperty.formData;
                }
                this.fileList = list as UploadFile[];
                this.notify(this.fileList);
                this.detectChanges();
            },
        );
    }

    private notify(fileList: UploadFile[]) {
        const res = fileList.map(item => {
            return !item.response
                ? item
                : deepGet(item.response, this.i.resReName, item.response);
        });
        if (this.ui.options['avatar']) {
            const resLast = res && res.length > 0 ? [res.pop()] : [];
            this.avatar = resLast && resLast.length > 0 ? resLast[0] : null;
            this.formProperty.setValue(resLast, false);
        } else {
            this.formProperty.setValue(
                this.i.multiple === true ? res : res.pop(),
                false,
            );
        }
    }

    handlePreview = (file: UploadFile, $event?: Event) => {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.modalSrv
            .create({
                nzContent: `<img src="${file.url ||
                    file.thumbUrl}" class="img-fluid" />`,
                nzFooter: null,
            })
            .afterClose.subscribe(() => this.detectChanges());
    };

    handleRemove = (file: any, $event: Event) => {
        $event.preventDefault();
        $event.stopPropagation();

        this.notify([]);
        this.detectChanges();
    };

    avatarInit() {
        this.ui.options = this.ui.options || {};
        if (this.ui.options['avatar']) {
            this.i.fileType =
                this.ui.fileType || 'image/png,image/jpeg,image/gif,image/bmp';
            this.i.listType = this.ui.listType || 'picture-card';
            this.i.showUploadList = false;
        }
    }
}
