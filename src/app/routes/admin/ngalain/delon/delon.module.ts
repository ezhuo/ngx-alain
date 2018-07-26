import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { DelonRoutingModule } from '@routes/admin/ngalain/delon/delon-routing.module';

import { SimpleTableComponent } from '@routes/admin/ngalain/delon/simple-table/simple-table.component';
import { UtilComponent } from '@routes/admin/ngalain/delon/util/util.component';
import { PrintComponent } from '@routes/admin/ngalain/delon/print/print.component';
import { ACLComponent } from '@routes/admin/ngalain/delon/acl/acl.component';
import { CanLeaveProvide } from '@routes/admin/ngalain/delon/guard/can-leave.provide';
import { GuardComponent } from '@routes/admin/ngalain/delon/guard/guard.component';
import { GuardLeaveComponent } from '@routes/admin/ngalain/delon/guard/leave.component';
import { GuardAdminComponent } from '@routes/admin/ngalain/delon/guard/admin.component';
import { GuardAuthComponent } from '@routes/admin/ngalain/delon/guard/auth.component';
import { CacheComponent } from '@routes/admin/ngalain/delon/cache/cache.component';
import { DownFileComponent } from '@routes/admin/ngalain/delon/downfile/downfile.component';
import { XlsxComponent } from '@routes/admin/ngalain/delon/xlsx/xlsx.component';
import { ZipComponent } from '@routes/admin/ngalain/delon/zip/zip.component';
import { DelonFormComponent } from '@routes/admin/ngalain/delon/form/form.component';
import { QRComponent } from '@routes/admin/ngalain/delon/qr/qr.component';

const COMPONENT = [
  SimpleTableComponent,
  UtilComponent,
  PrintComponent,
  ACLComponent,
  GuardComponent,
  GuardLeaveComponent,
  GuardAdminComponent,
  GuardAuthComponent,
  CacheComponent,
  DownFileComponent,
  XlsxComponent,
  ZipComponent,
  DelonFormComponent,
  QRComponent,
];

const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [CommonModule, SharedModule, DelonRoutingModule],
  providers: [CanLeaveProvide],
  declarations: [...COMPONENT, ...COMPONENT_NOROUNT],
  entryComponents: COMPONENT_NOROUNT,
})
export class DelonModule {}
