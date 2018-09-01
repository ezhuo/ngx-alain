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
                <i class="anticon anticon-upload"></i><span>文件上传</span>
            </button>
        </nz-upload>
    </nz-form-control>
  </nz-form-item>
</form>

<div class='modal-footer'>
    <button nz-button *ngIf="modalParams?.button?.submit?.show" nzType="primary" (click)='onSubmit($event)' [nzLoading]="httpSrv.loading" [disabled]='fileList.length < 1'>
        {{modalParams?.button?.submit?.title || '执行'}}
    </button>
    <button nz-button *ngIf="modalParams?.button?.close?.show" nzType="default" (click)='modalClose()'>
        {{modalParams?.button?.close?.title || '关闭'}}
    </button>
</div>

`;
