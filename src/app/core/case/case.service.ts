import { Injectable, Injector } from '@angular/core';

@Injectable()
export class CaseService {
    constructor(protected injector: Injector) { }
}
