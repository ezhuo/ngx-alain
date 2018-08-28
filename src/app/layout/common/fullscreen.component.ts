import { Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <div class="item d-flex align-items-center px-sm ant-dropdown-trigger">
      <i class="anticon anticon-{{status ? 'shrink' : 'arrows-alt'}}"></i>
      &nbsp;{{(status ? '退出全屏' : '全屏') }}&nbsp;
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
