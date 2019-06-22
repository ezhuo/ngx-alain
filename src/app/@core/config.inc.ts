import { App } from '@delon/theme';
import * as env from '@env/environment.config';
import { deepExtend } from './helpers/extend';
import { Canton, Router, Define, Api, Http } from '@core';

export const appDebug = env.appDebug;
export const appDebugError = env.appDebugError;
export const app: App = env.app;

/**
 *区域设置
 */
export const canton: Canton = env.canton;

/**
 *路由配置
 */
export const router: Router = deepExtend(
  {
    login: '/passport/login',
    lock: '/passport/lock',
  },
  env.router,
);

/**
 * API
 */
export const api: Api = {
  base: 'api',
  upload: '/api/file/upload',
  uploadImg: '/api/file/uploadImg',
  show: '/file/show/',
  down: '/uploads/',
  canton: 'canton/selectselectselect', // 获取区域的默认URL
};

/**
 * 富文本编辑器
 */
export const editor = assetsHelper.getCkeditorConfig();

/**
 *默认定义
 */
export const define: Define = deepExtend(
  {
    tableIndexColumn: {
      title: '#',
      index: '_index_',
      type: 'no',
      // fixed: 'left',
      width: 30,
    },
    tablePageSize: 10,
  },
  env.define,
);

/**
 *HTTP配置
 */
export const http: Http = {
  style: 10, // 数据包发送格式，10是明文 11是密文
  check: 'ezhuo@20161016', // 请求验证代码
};

export const httpCode = {
  200: '',
  201: '',
  202: '',
  204: '',
  203: '',
  205: '',

  400: '',
  401: '',
  403: '',
  404: '在服务器端，没有找到该请求服务！',
  405: '在服务器端，该API服务没有得到授权！',
  406: '重要：',
  410: '',
  411: '',
  412: '',
  422: '验证：',
  500: '服务器端异常！',
  504: '没有连接到服务器！',
};
