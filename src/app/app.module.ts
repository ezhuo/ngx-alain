import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
// import { SecurityContext } from '@angular/core';
// import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DelonModule } from './delon.module';
import { CoreModule } from '@core';

import { SharedModule, JsonSchemaModule, ThirdComponentModule } from '@shared';

import { LayoutFullScreenModule } from '@layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        ThirdComponentModule.forRoot(),
        CoreModule.forRoot(),
        SharedModule,
        LayoutFullScreenModule,
        AppRoutingModule,
        // JSON-Schema form
        JsonSchemaModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // constructor(sanitize: DomSanitizer) {
    //     // override the sanitize method so that it returns an empty string instead of null so that IE doesn't show "null" in the DOM
    //     if (sanitize && sanitize['__proto__'] && sanitize['sanitize'] && false) {
    //         sanitize.sanitize = function(
    //             context: SecurityContext,
    //             value: SafeValue | string | null,
    //         ): string | null {
    //             const val = (sanitize as any).__proto__.sanitize.call(
    //                 sanitize as any,
    //                 context,
    //                 value,
    //             );
    //             return val === null || val === undefined ? '' : val;
    //         };
    //     }
    // }
}
