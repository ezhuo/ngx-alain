import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { deepGet } from '@delon/util';
import { UploadFile, UploadChangeParam, NzModalService } from 'ng-zorro-antd';
import { ControlWidget } from '@delon/form';
import { getData, toBool } from '@delon/form/src/utils';

@Component({
  selector: 'sf-uploadAvatar',
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
            <i class="anticon anticon-plus"></i>
            <div class="ant-upload-text" [innerHTML]="i.text"></div>
          </ng-container>
          <ng-container *ngSwitchCase="'drag'">
            <p class="ant-upload-drag-icon"><i class="anticon anticon-inbox"></i></p>
            <p class="ant-upload-text" [innerHTML]="i.text"></p>
            <p class="ant-upload-hint" [innerHTML]="i.hint"></p>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <button type="button" nz-button>
              <i class="anticon anticon-upload"></i><span [innerHTML]="i.text"></span>
            </button>
          </ng-container>
        </ng-container>
      </ng-container>
      <ng-template #cross>
          <img [src]="avatar?.url" class="avatar" />
          <span class="ant-upload-list-item-actions avatar-action">
              <i (click)="handlePreview(avatar, $event)" class="anticon anticon-eye-o" title="查看"></i>
              &nbsp;&nbsp;
              <i (click)="handleRemove(avatar, $event)" class="anticon anticon-delete" title="删除"></i>
          </span>
      </ng-template>
    </nz-upload>

  </sf-item-wrap>
  `,
  preserveWhitespaces: false,
  styles: [`
  .avatar-action i{
    margin-top:10px;
    font-size:26px;
  }
  `]
})
export class UploadAvatarWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'uploadAvatar';
  i: any;
  fileList: UploadFile[] = [];
  btnType = '';
  avatar: any = null;

  constructor(cd: ChangeDetectorRef, private modalSrv: NzModalService) {
    super(cd);
  }

  ngOnInit(): void {
    this.i = {
      type: this.ui.type || 'select',
      text: this.ui.text || '点击上传',
      action: this.ui.action || '',
      accept: this.ui.accept || '',
      limit: this.ui.limit == null ? 0 : +this.ui.limit,
      size: this.ui.size == null ? 0 : +this.ui.size,
      fileType: this.ui.fileType || 'image/png,image/jpeg,image/gif,image/bmp',
      listType: this.ui.listType || 'picture-card',
      multiple: toBool(this.ui.multiple, false),
      name: this.ui.name || 'file',
      showUploadList: toBool(this.ui.showUploadList, false),
      withCredentials: toBool(this.ui.withCredentials, false),
      resReName: (this.ui.resReName || '').split('.'),
    };
    if (this.i.listType === 'picture-card') this.btnType = 'plus';
    if (this.i.type === 'drag') {
      this.i.listType = null;
      this.btnType = 'drag';
      this.i.text = this.ui.text || `单击或拖动文件到该区域上传`;
      this.i.hint =
        this.ui.hint || `支持单个或批量，严禁上传公司数据或其他安全文件`;
    }
  }

  change(args: UploadChangeParam) {
    if (this.ui.change) this.ui.change(args);
    if (args.type !== 'success') return;
    if (args.fileList.length > 0) {
      this.avatar = args.fileList[args.fileList.length - 1];
    }
    this.setValue(args.fileList);
    this.notify(args.fileList);
  }

  reset(value: any) {
    const uploadData = list => {
      this.fileList = list as UploadFile[];
      if (this.fileList && this.fileList.length > 0)
        this.avatar = this.fileList[0];
      this.notify(this.fileList);
      this.detectChanges();
    };
    // getData(this.schema, this.ui, this.formProperty.formData).subscribe(uploadData);
    if (value && value.length > 0) {
      uploadData(value);
    }
  }

  private notify(fileList: UploadFile[]) {
    const res = fileList.map(item =>
      deepGet(item.response, this.i.resReName, item.response),
    );
    this.formProperty.setValue(
      this.i.multiple === true ? res : res.pop(),
      false,
    );
  }

  handlePreview = (file: UploadFile, $event: Event) => {
    $event.preventDefault();
    $event.stopPropagation();

    this.modalSrv
      .create({
        nzContent: `<img src="${file.url ||
          file.thumbUrl}" class="img-fluid" />`,
        nzFooter: null,
      })
      .afterClose.subscribe(() => this.detectChanges());
  }

  handleRemove = (file: any, $event: Event) => {
    $event.preventDefault();
    $event.stopPropagation();
    this.avatar = null;
    this.setValue([]);
    this.detectChanges();
  }
}
