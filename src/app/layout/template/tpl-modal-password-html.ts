export const tplModalPasswordHTML = `
<div class='modal-header'>
    <div class='modal-title'>{{  modalTitle }}</div>
</div>

<div class="sf-view">
<sf #sf 
    [schema]='schemaData.password' 
    [ui]='schemaData.passwordUi' 
    [formData]='form.data' 
    (formSubmit)='onSubmit(sf)' 
    [button]="'none'"></sf>
</div>

<div class='modal-footer'>
    <button nz-button *ngIf="modalData?.button?.submit?.show" nzType="primary" (click)='sf.submit()' [nzLoading]="httpSrv.loading" [disabled]='!sf.valid'>
        <span [innerHTML]="modalData?.button?.submit?.title || '保存'"></span>
    </button>
    <button nz-button *ngIf="modalData?.button?.reset?.show" nzType="danger" (click)='sf.reset()'>
        <span [innerHTML]="modalData?.button?.reset?.title || '重置'"></span>    
    </button>
    <button nz-button *ngIf="modalData?.button?.close?.show" nzType="default" (click)='modalClose()'>
        <span [innerHTML]="modalData?.button?.close?.title || '关闭'"></span>
    </button>
</div>

`;
