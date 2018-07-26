import { Directive, HostListener } from '@angular/core';
import { FullContentComponent } from '@delon/abc/full-content/full-content.component';

@Directive({
  selector: '[full-toggle]',
})
export class FullContentToggleDirective {
  constructor(private parent: FullContentComponent) {}

  @HostListener('click')
  _click() {
    this.parent.toggle();
  }
}
