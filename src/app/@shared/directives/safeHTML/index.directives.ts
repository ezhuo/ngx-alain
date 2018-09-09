import {
    Directive,
    ElementRef,
    Renderer,
    Input,
    AfterViewInit,
} from '@angular/core';

@Directive({
    selector: '[safeHTML]',
})
export class SafeHTMLDirective implements AfterViewInit {
    private _element: HTMLElement;

    constructor(private renderer: Renderer, element: ElementRef) {
        this._element = element.nativeElement;
    }

    // update content model as it comes
    @Input()
    set safeHTML(content: string) {
        this._element.innerHTML = content;
    }

    ngAfterViewInit() {
        this.renderer.setElementClass(this._element, 'safeHTML-View', true);
    }
}
