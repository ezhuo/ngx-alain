import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/net/http.interceptor';
import { HttpService } from '@core/net/http.service';

const SERVICES = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}, HttpService];

@NgModule({
    imports: [],
    exports: [],
    providers: []
})
export class NetModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: NetModule,
            providers: [...SERVICES]
        };
    }
}
