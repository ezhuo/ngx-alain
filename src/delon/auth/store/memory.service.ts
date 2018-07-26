import { IStore } from '@delon/auth/store/interface';
import { ITokenModel } from '@delon/auth/token/interface';

export class MemoryStore implements IStore {
  private cache: { [key: string]: ITokenModel } = {};

  get(key: string): ITokenModel {
    return this.cache[key] || <any>{};
  }

  set(key: string, value: ITokenModel): boolean {
    this.cache[key] = value;
    return true;
  }

  remove(key: string) {
    this.cache[key] = null;
  }
}
