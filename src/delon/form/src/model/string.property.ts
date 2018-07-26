import { AtomicProperty } from '@delon/form/src/model/atomic.property';

export class StringProperty extends AtomicProperty {
  fallbackValue() {
    return null;
  }
}
