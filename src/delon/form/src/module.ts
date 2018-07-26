import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DelonUtilModule } from '@delon/util';

import { DelonFormConfig } from '@delon/form/src/config';
import {
  SchemaValidatorFactory,
  AjvSchemaValidatorFactory,
} from '@delon/form/src/validator.factory';
import { SFComponent } from '@delon/form/src/sf.component';
import { SFItemComponent } from '@delon/form/src/sf-item.component';
import { SFItemWrapComponent } from '@delon/form/src/sf-item-wrap.component';
import { SFTemplateDirective } from '@delon/form/src/widgets/custom/sf-template.directive';
import { SFFixedDirective } from '@delon/form/src/sf-fixed.directive';

const COMPONENTS = [
  SFComponent,
  SFItemComponent,
  SFItemWrapComponent,
  SFTemplateDirective,
  SFFixedDirective,
];

// region: widgets

import { WidgetRegistry } from '@delon/form/src/widget.factory';
import { NzWidgetRegistry } from '@delon/form/src/widgets/nz-widget.registry';
import { ObjectWidget } from '@delon/form/src/widgets/object/object.widget';
import { ArrayWidget } from '@delon/form/src/widgets/array/array.widget';
import { StringWidget } from '@delon/form/src/widgets/string/string.widget';
import { NumberWidget } from '@delon/form/src/widgets/number/number.widget';
import { DateWidget } from '@delon/form/src/widgets/date/date.widget';
import { TimeWidget } from '@delon/form/src/widgets/time/time.widget';
import { RadioWidget } from '@delon/form/src/widgets/radio/radio.widget';
import { CheckboxWidget } from '@delon/form/src/widgets/checkbox/checkbox.widget';
import { BooleanWidget } from '@delon/form/src/widgets/boolean/boolean.widget';
import { TextareaWidget } from '@delon/form/src/widgets/textarea/textarea.widget';
import { SelectWidget } from '@delon/form/src/widgets/select/select.widget';
import { TagWidget } from '@delon/form/src/widgets/tag/tag.widget';
import { UploadWidget } from '@delon/form/src/widgets/upload/upload.widget';
import { TransferWidget } from '@delon/form/src/widgets/transfer/transfer.widget';
import { SliderWidget } from '@delon/form/src/widgets/slider/slider.widget';
import { CustomWidget } from '@delon/form/src/widgets/custom/custom.widget';
import { RateWidget } from '@delon/form/src/widgets/rate/rate.widget';
import { AutoCompleteWidget } from '@delon/form/src/widgets/autocomplete/autocomplete.widget';
import { CascaderWidget } from '@delon/form/src/widgets/cascader/cascader.widget';
import { MentionWidget } from '@delon/form/src/widgets/mention/mention.widget';
import { TextWidget } from '@delon/form/src/widgets/text/text.widget';

const WIDGETS = [
  ObjectWidget,
  ArrayWidget,
  StringWidget,
  NumberWidget,
  DateWidget,
  TimeWidget,
  RadioWidget,
  CheckboxWidget,
  BooleanWidget,
  TextareaWidget,
  SelectWidget,
  TagWidget,
  UploadWidget,
  TransferWidget,
  SliderWidget,
  RateWidget,
  AutoCompleteWidget,
  CascaderWidget,
  MentionWidget,
  CustomWidget,
  TextWidget,
];

// endregion

@NgModule({
  imports: [CommonModule, FormsModule, DelonUtilModule, NgZorroAntdModule],
  declarations: [...COMPONENTS, ...WIDGETS],
  entryComponents: [...WIDGETS],
  exports: [...COMPONENTS],
})
export class DelonFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonFormModule,
      providers: [
        DelonFormConfig,
        {
          provide: SchemaValidatorFactory,
          useClass: AjvSchemaValidatorFactory,
        },
        { provide: WidgetRegistry, useClass: NzWidgetRegistry },
      ],
    };
  }
}
