import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core';
import { environment } from '@env/environment';

const routes: Routes = [
  {
    path: 'app',
    canLoad: [AuthGuard],
    loadChildren: './routes/routes.module#RoutesModule',
    data: { app: true }
  },
  // 全屏布局
  {
    path: 'data-v',
    loadChildren: './routes/admin/ngalain/data-v/data-v.module#DataVModule'
  },
  // passport
  {
    path: 'passport',
    loadChildren: './layout/passport/passport.module#PassportModule',
  },
  // exception
  {
    path: 'exception',
    loadChildren: './layout/exception/exception.module#LayoutExceptionModule',
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' },
];

const config: ExtraOptions = { useHash: environment.useHash };

export const routedComponents = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: [...routedComponents]
})
export class AppRoutingModule { }
