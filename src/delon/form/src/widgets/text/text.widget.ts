import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
  selector: 'sf-text',
  template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
    {{ getTextValue }}
  </sf-item-wrap>
  `,
  preserveWhitespaces: false,
})
export class TextWidget extends ControlWidget implements OnInit {
  ngOnInit(): void {
    this.ui._required = false;
  }

  get getTextValue() {
    if (this.ui.enum) {
      let tmpValue = this.value;
      if (tmpValue == undefined || tmpValue == null)
        tmpValue = this.schema.default;
      return this.getDict(this.ui.enum, tmpValue);
    } else {
      return this.value || this.ui.defaultText || '-';
    }
  }

  getDict = (dict, v) => {
    for (const idx of dict) {
      if (idx) {
        if (idx.hasOwnProperty('value') && idx.value == v) {
          return idx.title || idx.label || '-';
        }
      }
    }
    return '-';
  }

}
