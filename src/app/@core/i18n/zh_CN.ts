import { registerLocaleData } from '@angular/common';
import zh_CN from '@angular/common/locales/zh';
registerLocaleData(zh_CN);

import * as df_zh_cn from 'date-fns/locale/zh_cn';
(window as any).__locale__ = df_zh_cn;
