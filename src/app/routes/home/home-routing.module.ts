import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/data/auth-guard.service';
import { IndexComponent } from '@routes/home/index/index.component';
import { NewsComponent } from '@routes/home/news/news.component';

import { NewsListComponent } from '@routes/home/news/newsList/newsList.component';
import { NewsInfoComponent } from '@routes/home/news/newsInfo/newsinfo.component';
import { HomeBreadcrumbComponent } from '@routes/home/breadcrumb/breadcrumb.component';
import { ZzshComponent } from '@routes/home/zzsh/zzsh.component';

const routes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    children:
        [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'index', component: IndexComponent },
                    {
                        path: 'news', component: NewsComponent,
                        children: [
                            { path: 'list', component: NewsListComponent },
                            { path: 'info/:id', component: NewsInfoComponent },
                            { path: '', redirectTo: 'list', pathMatch: 'full' }
                        ]
                    },
                    { path: 'zzsh', component: ZzshComponent },
                    { path: 'zyfw', component: ZzshComponent },
                    { path: 'zthd', component: ZzshComponent },
                    { path: '', redirectTo: 'index', pathMatch: 'full' }
                ]
            },
        ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }

export const entryComponents = [];

export const routedComponents = [
    HomeBreadcrumbComponent,
    IndexComponent,
    NewsComponent,
    NewsListComponent,
    NewsInfoComponent,
    ZzshComponent
];
