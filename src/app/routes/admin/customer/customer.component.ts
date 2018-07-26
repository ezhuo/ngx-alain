import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-system-component',
    template: `<router-outlet></router-outlet>`
})

export class CustomerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
