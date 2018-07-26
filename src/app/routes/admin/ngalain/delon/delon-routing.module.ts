import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';

import { SimpleTableComponent } from '@routes/admin/ngalain/delon/simple-table/simple-table.component';
import { UtilComponent } from '@routes/admin/ngalain/delon/util/util.component';
import { PrintComponent } from '@routes/admin/ngalain/delon/print/print.component';
import { ACLComponent } from '@routes/admin/ngalain/delon/acl/acl.component';
import { GuardComponent } from '@routes/admin/ngalain/delon/guard/guard.component';
import { GuardLeaveComponent } from '@routes/admin/ngalain/delon/guard/leave.component';
import { GuardAuthComponent } from '@routes/admin/ngalain/delon/guard/auth.component';
import { GuardAdminComponent } from '@routes/admin/ngalain/delon/guard/admin.component';
import { CanLeaveProvide } from '@routes/admin/ngalain/delon/guard/can-leave.provide';
import { CacheComponent } from '@routes/admin/ngalain/delon/cache/cache.component';
import { DownFileComponent } from '@routes/admin/ngalain/delon/downfile/downfile.component';
import { XlsxComponent } from '@routes/admin/ngalain/delon/xlsx/xlsx.component';
import { ZipComponent } from '@routes/admin/ngalain/delon/zip/zip.component';
import { DelonFormComponent } from '@routes/admin/ngalain/delon/form/form.component';
import { QRComponent } from '@routes/admin/ngalain/delon/qr/qr.component';

const routes: Routes = [
  { path: 'simple-table', component: SimpleTableComponent },
  { path: 'util', component: UtilComponent },
  { path: 'print', component: PrintComponent },
  { path: 'acl', component: ACLComponent },
  {
    path: 'guard',
    component: GuardComponent,
    children: [
      {
        path: 'leave',
        component: GuardLeaveComponent,
        canDeactivate: [CanLeaveProvide],
      },
      {
        path: 'auth',
        component: GuardAuthComponent,
        canActivate: [ACLGuard],
        data: { guard: 'user1' },
      },
      {
        path: 'admin',
        component: GuardAdminComponent,
        canActivate: [ACLGuard],
        data: { guard: 'admin' },
      },
    ],
  },
  { path: 'cache', component: CacheComponent },
  { path: 'qr', component: QRComponent },
  { path: 'downfile', component: DownFileComponent },
  { path: 'xlsx', component: XlsxComponent },
  { path: 'zip', component: ZipComponent },
  { path: 'form', component: DelonFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelonRoutingModule {}
