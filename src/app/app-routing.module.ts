import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard, configInc } from '@core';
import { environment } from '@env/environment';

const routes: Routes = [
  // 前台网站
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
  },
  // 管理后台
  {
    path: 'admin',
    loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
  },
  // passport
  {
    path: 'passport',
    loadChildren: () => import('./layout/passport/passport.module').then(m => m.LayoutPassportModule),
  },
  // exception
  {
    path: 'exception',
    loadChildren: () => import('./layout/exception/exception.module').then(m => m.LayoutExceptionModule),
  },
  { path: '', redirectTo: configInc.router.defaultRoute, pathMatch: 'full' },
  { path: '**', redirectTo: configInc.router.defaultRoute },
];

const config: ExtraOptions = { useHash: environment.useHash };

export const routedComponents = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: [...routedComponents],
})
export class AppRoutingModule {}