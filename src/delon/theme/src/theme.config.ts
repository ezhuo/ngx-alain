import { Injectable } from '@angular/core';
import { HttpClientConfig } from '@delon/theme/src/services/http/http.config';

@Injectable({ providedIn: 'root' })
export class DelonThemeConfig {
  http?: HttpClientConfig;
}
