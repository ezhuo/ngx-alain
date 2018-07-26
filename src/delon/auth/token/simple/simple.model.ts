import { ITokenModel } from '@delon/auth/token/interface';

export class SimpleTokenModel implements ITokenModel {
  [key: string]: any;

  token: string;
}
