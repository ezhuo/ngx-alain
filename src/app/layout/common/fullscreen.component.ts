import { Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <div class="alain-default__nav-item">
      <i nz-icon [type]="status ? 'fullscreen' : 'fullscreen-exit'" class="alain-default__nav-item-icon"></i>
        {{(status ? '退出全屏' : '全屏') }}
    </div>
  `,
  host: {
    '[class.d-block]': 'true',
  },
})
export class HeaderFullScreenComponent {
  status = false;

  @HostListener('window:resize')
  _resize() {
    this.status = screenfull.isFullscreen;
  }

  @HostListener('click')
  _click() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
