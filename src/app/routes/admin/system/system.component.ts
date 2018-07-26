import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-component',
    template: `<router-outlet></router-outlet>`
})

export class SystemComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
