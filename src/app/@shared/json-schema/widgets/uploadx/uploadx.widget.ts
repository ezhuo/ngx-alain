import { Component, OnInit } from '@angular/core';
import { deepGet } from '@delon/util';
import { NzModalService, UploadChangeParam, UploadFile } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { getData, toBool } from '@delon/form/src/utils';
import { ControlWidget, SFValue } from '@delon/form';
import * as helpers from '@core/helpers';

@Component({
  selector: 'sf-uploadx',
  templateUrl: `./uploadx.widget.html`,
  styleUrls: [`./uploadx.widget.less`],
})
export class UploadxWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'uploadx';
  i: any;
  fileList: UploadFile[] = [];
  btnType = '';
  avatar: any = null;

  ngOnInit(): void {
    const {
      type,
      text,
      action,
      accept,
      limit,
      filter,
      fileSize,
      fileType,
      listType,
      multiple,
      name,
      showUploadList,
      withCredentials,
      resReName,
      urlReName,
      beforeUpload,
      customRequest,
      directory,
      openFileDialogOnClick,
    } = this.ui;
    this.i = {
      type: type || 'select',
      text: text || '点击上传',
      action: action || '',
      accept: accept || '',
      directory: toBool(directory, false),
      openFileDialogOnClick: toBool(openFileDialogOnClick, true),
      limit: limit == null ? 0 : +limit,
      filter: filter == null ? [] : filter,
      size: fileSize == null ? 0 : +fileSize,
      fileType: fileType || '',
      listType: listType || 'text',
      multiple: toBool(multiple, false),
      name: name || 'file',
      showUploadList: toBool(showUploadList, true),
      withCredentials: toBool(withCredentials, false),
      resReName: (resReName || '').split('.'),
      urlReName: (urlReName || '').split('.'),
      beforeUpload: typeof beforeUpload === 'function' ? beforeUpload : null,
      customRequest: typeof customRequest === 'function' ? customRequest : null,
    };
    this.avatarInit();
    if (this.i.listType === 'picture-card') {
      this.btnType = 'plus';
    }
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
    this._setValue(args.fileList);
  }

  reset(value: SFValue) {
    const { fileList } = this.ui;
    (fileList
      ? of(fileList)
      : getData(this.schema, this.ui, this.formProperty.formData)
    ).subscribe(list => {
      if (
        !this.ui.enum &&
        this.formProperty.formData &&
        Array.isArray(this.formProperty.formData)
      ) {
        list = this.formProperty.formData;
      }
      this.fileList = list as UploadFile[];
      this._setValue(this.fileList);
      this.detectChanges();
    });
  }

  private _getValue(file: UploadFile) {
    return deepGet(
      file.response || file,
      this.i.resReName,
      file.response || file,
    );
  }

  private _setValue(fileList: UploadFile[]) {
    fileList
      .filter(file => !file.url)
      .forEach(file => {
        file.url = deepGet(file.response, this.i.urlReName);
      });
    let res = fileList.map(file => this._getValue(file));
    if (res && res.length > 0 && !res[0]) {
      res = fileList;
    }
    if (this.ui.options['avatar']) {
      const resLast = fileList && fileList.length > 0 ? [fileList.pop()] : [];
      this.avatar = resLast && resLast.length > 0 ? resLast[0] : null;
      this.formProperty.setValue(resLast, false);
    } else {
      this.setValue(this.i.multiple === true ? res : res.pop());
    }
  }

  handlePreview = (file: UploadFile, $event?: Event) => {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (this.ui.preview) {
      this.ui.preview(file);
      return;
    }
    if (
      ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].indexOf(file.type) <
      0
    ) {
      return helpers.aClick(file.url);
    }
    const _url = file.thumbUrl || file.url;
    if (!_url) {
      return;
    }
    this.injector.get(NzModalService).create({
      nzContent: `<img src="${_url}" class="img-fluid" />`,
      nzFooter: null,
    });
  };

  handleRemove = (file: any, $event: Event) => {
    $event.preventDefault();
    $event.stopPropagation();

    this._setValue([]);
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
