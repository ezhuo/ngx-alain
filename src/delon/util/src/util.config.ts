import { Injectable } from '@angular/core';
import { ArrayConfig } from '@delon/util/src/array/array.config';

@Injectable({ providedIn: 'root' })
export class DelonUtilConfig {
  array?: ArrayConfig;
}
