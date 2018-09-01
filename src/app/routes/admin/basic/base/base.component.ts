import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-base-component',
    template: `<router-outlet></router-outlet>`
})

export class BaseComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
