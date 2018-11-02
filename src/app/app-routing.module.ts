import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard, configInc } from '@core';
import { environment } from '@env/environment';

const routes: Routes = [
  // 前台网站
  {
    path: 'home',
    loadChildren: './routes/home/home.module#HomeModule',
  },
  // 管理后台
  {
    path: 'admin',
    loadChildren: './routes/admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
  },
  // passport
  {
    path: 'passport',
    loadChildren: './layout/passport/passport.module#LayoutPassportModule',
  },
  // exception
  {
    path: 'exception',
    loadChildren: './layout/exception/exception.module#LayoutExceptionModule',
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
