import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DelonModule } from './delon.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { LayoutModule } from '@layout/layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// @delon/form: JSON Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';

// third
import { ThirdComponentModule } from '@shared/third-component.module';

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
    LayoutModule,
    AppRoutingModule,
    // JSON-Schema form
    JsonSchemaModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
