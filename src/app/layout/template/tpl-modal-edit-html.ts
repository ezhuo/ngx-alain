export const tplModalEditHTML = `
<div class='modal-header'>
    <div class='modal-title'>{{  modalTitle }}</div>
</div>

<div class="sf-view">
<sf #sf 
    [schema]='schemaData.main' 
    [ui]='schemaData.mainUi' 
    [formData]='form.data' 
    (formSubmit)='onSubmit(sf)' 
    [button]="'none'"></sf>
</div>

<div class='modal-footer'>
    <button nz-button *ngIf="modalParams?.button?.submit?.show" nzType="primary" (click)='sf.submit()' [nzLoading]="httpSrv.loading" [disabled]='!sf.valid'>
        <span [innerHTML]="modalParams?.button?.submit?.title || '保存'"></span>
    </button>
    <button nz-button *ngIf="modalParams?.button?.reset?.show" nzType="danger" (click)='sf.reset()'>
        <span [innerHTML]="modalParams?.button?.reset?.title || '重置'"></span>    
    </button>
    <button nz-button *ngIf="modalParams?.button?.close?.show" nzType="default" (click)='modalClose()'>
        <span [innerHTML]="modalParams?.button?.close?.title || '关闭'"></span>
    </button>
</div>

`;
