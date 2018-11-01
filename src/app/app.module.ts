import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
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
export class AppModule {}
