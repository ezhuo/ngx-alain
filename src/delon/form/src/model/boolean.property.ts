import { AtomicProperty } from '@delon/form/src/model/atomic.property';

export class BooleanProperty extends AtomicProperty {
  fallbackValue(): any {
    return null;
  }
}
