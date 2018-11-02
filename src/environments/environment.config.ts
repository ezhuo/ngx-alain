import { App } from '@delon/theme';
import { Canton, Router, Define } from '@core/config.inc';

export const appDebug = true;
export const appDebugError = true;

export const app: App = {
  key: 'ngxalain',
  year: 2018,
};

export const define: Define = {
  userImages: './assets/images/default/no-user.png', // 用户默认图片
  userCutImages: './assets/images/user/default_user.png', // 默认用户的图片
  logoLogin: './assets/images/logo/logo.png',
  logoTopLarge: './assets/images/logo/logo.png',
  logoTopSmall: './assets/images/logo/logo-small.png',
};

/**
 *区域设置
 */
export const canton: Canton = {
  id: null, // 默认区域ID
  fdn: null, // 默认区域
  name: null,
};

/**
 *路由配置
 */
export const router: Router = {
  defaultRoute: 'admin',
  defaultUrl: 'admin',
  home: 'home',
  admin: 'admin',
};
