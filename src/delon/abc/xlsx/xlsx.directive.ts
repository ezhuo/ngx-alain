import { Directive, HostListener, Input } from '@angular/core';
import { XlsxService } from '@delon/abc/xlsx/xlsx.service';
import { XlsxExportOptions } from '@delon/abc/xlsx/interface';

@Directive({ selector: '[xlsx]' })
export class XlsxDirective {
  @Input('xlsx') data: XlsxExportOptions;

  constructor(private srv: XlsxService) {}

  @HostListener('click')
  _click() {
    this.srv.export(this.data);
  }
}
