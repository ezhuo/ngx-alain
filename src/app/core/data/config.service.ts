import { Injectable } from '@angular/core';
import * as config from '../config.inc';

@Injectable()
export class ConfigService {
    config: any = config;
    app_debug: any = config.app_debug;
    app: any = config.app;
    api: any = config.api;
    canton: any = config.canton;
    define: any = config.define;
    router: any = config.router;
    menus: any = config.menus;
    ckeditor: any = config.editor;
}
