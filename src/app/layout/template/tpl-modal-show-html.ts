export const tplModalShowHTML =
  `
  
<div class='modal-header'>
  <div class='modal-title'>查看</div>
</div>

  <div class="sf-view">
    <sf #sf 
        [schema]='mainSchema' 
        [ui]='mainSchemaUi' 
        [formData]='formData'
        [button]="'none'"></sf>
  </div>

<div class='modal-footer'>
  <button nz-button type='button' (click)='modalClose()'>关闭</button>
</div>

`;

