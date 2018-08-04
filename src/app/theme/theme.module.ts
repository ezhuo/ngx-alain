import { NgModule } from '@angular/core';

import { DtTreeDirective } from './directives/tree.directives';

const MODULES = [];

const DIRECTIVES = [
    DtTreeDirective
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
