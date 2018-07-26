import { WidgetRegistry } from '@delon/form/src/widget.factory';

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

export class NzWidgetRegistry extends WidgetRegistry {
  constructor() {
    super();

    this.register('object', ObjectWidget);
    this.register('array', ArrayWidget);

    this.register('text', TextWidget);
    this.register('string', StringWidget);
    this.register('number', NumberWidget);
    this.register('integer', NumberWidget);
    this.register('date', DateWidget);
    this.register('time', TimeWidget);
    this.register('radio', RadioWidget);
    this.register('checkbox', CheckboxWidget);
    this.register('boolean', BooleanWidget);
    this.register('textarea', TextareaWidget);
    this.register('select', SelectWidget);
    this.register('tag', TagWidget);
    this.register('upload', UploadWidget);
    this.register('transfer', TransferWidget);
    this.register('slider', SliderWidget);
    this.register('rate', RateWidget);
    this.register('autocomplete', AutoCompleteWidget);
    this.register('cascader', CascaderWidget);
    this.register('mention', MentionWidget);
    this.register('custom', CustomWidget);

    this.setDefault(StringWidget);
  }
}
