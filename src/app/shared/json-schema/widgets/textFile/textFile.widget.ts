import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from '@delon/form';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'sf-textFile',
  template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
  <ng-container *ngFor="let f of value">
      <a [attr.href]="f?.url" target="_blank" class="avatar-show">
          <img [src]="f?.url" class="avatar " [attr.title]="f.fileName" *ngIf="isPicture" />
          <span [innerHTML]="f.fileName" *ngIf="!isPicture"></span>
      </a>
  </ng-container>  

  </sf-item-wrap>
  `,
  preserveWhitespaces: false,
})
export class TextFileWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'textFile';

  constructor(cd: ChangeDetectorRef, private modalSrv: NzModalService) {
    super(cd);
  }

  ngOnInit(): void {
    this.ui._required = false;
  }

  handlePreview = (file: any, $event: Event) => {
    $event.preventDefault();
    $event.stopPropagation();

    this.modalSrv
      .create({
        nzContent: `<img src="${file.url ||
          file.thumbUrl}" class="img-fluid" />`,
        nzFooter: null,
      })
      .afterClose.subscribe(() => this.detectChanges());
  }

  get isPicture() {
    return ['picture', 'picture-card'].indexOf(this.ui.listType) > -1;
  }

}
