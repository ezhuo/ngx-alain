import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';
import * as helpers from '@core/helpers';

@Component({
  selector: 'sf-ckeditor',
  template: `
    <sf-item-wrap
      [id]="id"
      [schema]="schema"
      [ui]="ui"
      [showError]="showError"
      [error]="error"
      [showTitle]="schema.title"
    >
      <ckeditor
        [ngModel]="value"
        (ngModelChange)="change($event)"
        [config]="config"
        [readonly]="false"
        (change)="change($event)"
        [debounce]="delay"
        name="ckeditor"
      >
      </ckeditor>
    </sf-item-wrap>
  `,
  preserveWhitespaces: false,
  styles: [
    `
      :host ckeditor {
        line-height: normal;
      }
    `,
  ],
})
// tslint:disable-next-line:component-class-suffix
export class CkeditorWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'ckeditor';

  config: any;
  loading: string;
  delay: number;

  ngOnInit(): void {
    this.loading = this.ui.loading || '加载中……';
    if (this.ui.config && helpers.isFunction(this.ui.config)) {
      this.config = this.ui.config();
    } else {
      this.config = this.ui.config || {};
    }
    this.delay = this.ui.delay || 500;
  }

  change(value: string) {
    if (this.ui.change) this.ui.change(value);
    this.setValue(value);
  }
}
