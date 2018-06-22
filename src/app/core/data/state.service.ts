import { Injectable, Injector } from '@angular/core';
import { UserService } from './users.service';
import { HttpService } from '../net/http.service';
import * as config from '../config.inc';

@Injectable()
export class StateService {
  constructor(private injector: Injector) { }

  public config = config;
  public app = config.app;
  public api = config.api;
  public canton = config.canton;
  public define = config.define;
  public router = config.router;

  get httpLoading() {
    return this.injector.get(HttpService).loading;
  }

}
