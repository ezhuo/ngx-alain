import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
    imports: [
        UEditorModule.forRoot({
            // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
            js: [
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js`,
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js`,
            ],
            options: {
                UEDITOR_HOME_URL: `//apps.bdimg.com/libs/ueditor/1.4.3.1/`,
            },
        }),
        NgxTinymceModule.forRoot({
            baseURL: '//cdn.bootcss.com/tinymce/4.7.4/',
        }),
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class ThirdComponentModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThirdComponentModule,
            providers: []
        };
    }
}

export const ThirdComponentModuleList = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    NgxTinymceModule,
    CKEditorModule
];
