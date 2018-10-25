import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CaseService {
    constructor(protected injector: Injector) {}
}
