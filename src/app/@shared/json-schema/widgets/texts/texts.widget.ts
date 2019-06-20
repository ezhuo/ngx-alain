import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';
import { getData } from '@delon/form/src/utils';
import { helpers } from '@core';

@Component({
  selector: 'sf-texts',
  templateUrl: `./texts.widget.html`,
})
export class TextsWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'texts';

  ngOnInit(): void {
    this.ui._required = false;
    // console.log(this.value);
  }

  get isPicture() {
    return (
      this.isFiles &&
      (this.isAvatar ||
        ['picture', 'picture-card'].indexOf(this.ui.listType) > -1)
    );
  }

  get isAvatar() {
    this.ui.options = this.ui.options || {};
    return this.ui.options['avatar'];
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

  get getFilesValue() {
    return helpers.formatUploadFilesToObject(this.value || this.ui.defaultText);
  }

  isFilePicture(file) {
    return (
      ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].indexOf(file.type) >
      -1
    );
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
