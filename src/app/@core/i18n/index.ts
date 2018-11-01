// #region default language
import { LOCALE_ID } from '@angular/core';

// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
const LANG = {
    abbr: 'zh',
    ng: ngLang,
    zorro: zorroLang,
    delon: delonLang,
};
// register angular
import { registerLocaleData } from '@angular/common';
registerLocaleData(LANG.ng, LANG.abbr);

import * as df_zh_cn from 'date-fns/locale/zh_cn';
(window as any).__locale__ = df_zh_cn;

export const LANG_PROVIDES = [
    { provide: LOCALE_ID, useValue: LANG.abbr },
    { provide: NZ_I18N, useValue: LANG.zorro },
    { provide: DELON_LOCALE, useValue: LANG.delon },
];
// #endregion

// #region i18n services
// import { ALAIN_I18N_TOKEN } from '@delon/theme';

export const I18NSERVICE_MODULES = [];

export const I18NSERVICE_PROVIDES = [];
