import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';
import { getData } from '@delon/form/src/utils';
import { helpers } from '@core';

@Component({
  selector: 'sf-texts',
  template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
    
    <ng-container *ngIf="!isFiles">
        <div [safeHTML]="getTextValue"></div>
    </ng-container>

    <ng-container *ngIf="isFiles">
      <ng-container *ngFor="let f of value">
        <a [attr.href]="f?.url" target="_blank" class="avatar-show">
            <img [src]="f?.url" class="avatar " [attr.title]="f.name" *ngIf="isPicture" />
            <span [innerHTML]="f.name" *ngIf="!isPicture"></span>
        </a>
      </ng-container>
    </ng-container>

  </sf-item-wrap>
  `,
  preserveWhitespaces: false,
})
export class TextsWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'texts';

  ngOnInit(): void {
    this.ui._required = false;
  }

  get isPicture() {
    this.ui.options = this.ui.options || {};
    return this.isFiles && (
      this.ui.options['avatar'] ||
      (['picture', 'picture-card'].indexOf(this.ui.listType) > -1)
    );
  }

  get isFiles() {
    this.ui.options = this.ui.options || {};
    const old = this.ui.options['oldwidget'] || '';
    return old.indexOf('upload') > -1;
  }

  get getTextValue() {
    let tmpValue = this.value || this.ui.defaultText;
    if (!tmpValue) return '-';

    let tmpValue2 = null;
    if (this.ui.enum) {
      tmpValue = tmpValue || this.schema.default;
      if (tmpValue) tmpValue2 = helpers.getDict(this.ui.enum, tmpValue);
      return tmpValue2 ? tmpValue2 : tmpValue || '-';
    } else {
      return tmpValue || '-';
    }
  }

  reset(value: any) {
    if (this.ui.asyncData) {
      this.ui.enum = this.ui.enum || [];
      getData(this.schema, this.ui, this.formProperty.formData).subscribe(
        list => {
          this.ui.enum = list;
          this.detectChanges();
        },
      );
    }
  }

}
