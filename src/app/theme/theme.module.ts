import { NgModule } from '@angular/core';

import {
    JsTreeDirective,
    SafeHTMLDirective
} from './directives';

const MODULES = [];

const DIRECTIVES = [
    JsTreeDirective,
    SafeHTMLDirective
];

const COMPONENTS = [];
const PROVIDERS = [];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...MODULES,
        ...DIRECTIVES,
        ...COMPONENTS
    ],
    declarations: [
        ...DIRECTIVES,
        ...COMPONENTS
    ],
    providers: [...PROVIDERS],
})
export class ThemeModule { }
