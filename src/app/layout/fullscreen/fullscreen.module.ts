import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { LayoutFullScreenComponent } from './fullscreen.component';

const COMPONENTS = [
    LayoutFullScreenComponent,
];

const HEADERCOMPONENTS = [
];

@NgModule({
    declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
    imports: [SharedModule],
    exports: [...COMPONENTS, ...HEADERCOMPONENTS],
    providers: []
})
export class LayoutFullScreenModule { }
