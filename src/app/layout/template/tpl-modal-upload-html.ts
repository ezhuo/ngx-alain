export const tplModalUploadHTML = `
<div class='modal-header'>
    <div class='modal-title'>{{  modalTitle }}</div>
</div>

<form nz-form [nzLayout]="'inline'" class="search-form">
  <nz-form-item>
    <nz-form-control>
        <nz-upload [nzAction]="configSrv.api.upload" 
                    (nzChange)="onChange($event)"
                    [(nzFileList)]="fileList"
                    [nzAccept]="fileAccept">
            <button nz-button>
                <i nz-icon type="upload"></i><span>文件上传</span>
            </button>
        </nz-upload>
    </nz-form-control>
  </nz-form-item>
</form>

<div class='modal-footer'>
    <button nz-button *ngIf="modalData?button?.submit?.show" nzType="primary" (click)='onSubmit($event)' [nzLoading]="httpSrv.loading" [disabled]='fileList.length < 1'>
        <span [innerHTML]="modalData?button?.submit?.title || '执行'"></span>
    </button>
    <button nz-button *ngIf="modalData?button?.close?.show" nzType="default" (click)='modalClose()'>
        <span [innerHTML]="modalData?button?.close?.title || '关闭'"></span>    
    </button>
</div>

`;
