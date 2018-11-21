import { Pipe, PipeTransform } from '@angular/core';
import {format , distanceInWordsToNow} from 'date-fns';

@Pipe({ name: '_date' })
export class DatePipe implements PipeTransform {
  transform(
    value: Date | string | number,
    formatString: string = 'YYYY-MM-DD HH:mm',
  ): string {
    if (value) {
      if (formatString === 'fn') {
        return distanceInWordsToNow(value, {
          locale: (window as any).__locale__,
        });
      }
      if (typeof value === 'string' && !isNaN(+value)) {
        value = +value;
      }
      return format(value, formatString);
    } else {
      return '';
    }
  }
}
