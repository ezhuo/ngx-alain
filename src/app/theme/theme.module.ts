import { NgModule } from '@angular/core';

import { BaseComponent } from '@theme/parent/base.component';
import { ParentIndexComponent } from '@routes/parent/parent.index.component';
import { ParentModalComponent } from '@routes/parent/parent.modal.component';

import { DtTreeDirective } from '@theme/directives/tree.directives';

const MODULES = [];

const DIRECTIVES = [
    DtTreeDirective
];

const COMPONENTS = [
    BaseComponent,
    ParentIndexComponent,
    ParentModalComponent,
];
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
