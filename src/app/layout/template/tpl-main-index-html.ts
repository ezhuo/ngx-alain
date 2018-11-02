export const tplMainIndexHTML =
  `
  <div class="alain-default__content-title">
  <h1>
    {{pageTitle}}
    <small></small>
  </h1>
  <div>
    <button nz-button (click)="add()" [nzType]="'primary'">新建</button>
    <button nz-button (click)="add2()" [nzType]="'primary'">添加2</button>
  </div>
</div>

<sf #sf mode="search" [schema]="schemaData.search" [formData]="tableReq.params" (formSubmit)="st.reset($event)" (formReset)="st.reset(tableReq.params)" class="search-form" [button]="'none'">
  <nz-form-item class="sf-btns">
    <nz-form-control class="ant-form-item-control-wrapper">
      <div class="ant-form-item-control">
        <button type="submit" nz-button [nzType]="'primary'">查询</button>
      </div>
    </nz-form-control>
  </nz-form-item>
  <nz-form-item class="sf-btns">
    <nz-form-control class="ant-form-item-control-wrapper">
      <div class="ant-form-item-control">
        <button nz-button (click)="appCase.exportXlsFromServer()">导出</button>
      </div>
    </nz-form-control>
  </nz-form-item>
</sf>

<div nz-row>
  <div nz-col nzSpan="24">
    <st #st class="simple-table" [data]="dataSource.url" [columns]="tableData.col" [req]="tableReq"></st>
  </div>
</div>


`;

