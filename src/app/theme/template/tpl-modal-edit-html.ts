export const tplModalEditHTML =
    `
<div class='modal-header'>
    <div class='modal-title'>{{  modalTitle }}</div>
</div>

<div class="sf-view">
<sf #sf 
    [schema]='mainSchema' 
    [ui]='mainSchemaUi' 
    [formData]='formData' 
    (formSubmit)='onSubmit(sf)' 
    [button]="'none'"></sf>
</div>

<div class='modal-footer'>
    <button nz-button *ngIf="modalParams?.modal?.button?.submit?.show" nzType="primary" (click)='sf.submit()' [nzLoading]="httpSrv.loading" [disabled]='!sf.valid'>
        {{modalParams?.modal?.button?.submit?.title || '保存'}}
    </button>
    <button nz-button *ngIf="modalParams?.modal?.button?.reset?.show" nzType="danger" (click)='sf.reset()'>
        {{modalParams?.modal?.button?.reset?.title || '重置'}}
    </button>
    <button nz-button *ngIf="modalParams?.modal?.button?.close?.show" nzType="default" (click)='modalClose()'>
        {{modalParams?.modal?.button?.close?.title || '关闭'}}
    </button>
</div>

`;

