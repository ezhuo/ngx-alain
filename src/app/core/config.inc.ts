import { App, Menu } from '@delon/theme';

export const app_debug = false;

export const app_debug_error = true;

export const app: App = {
  name: 'ngx-alain',
  short: 'ngx-alain',
  description: 'ngx-alain',
  key: 'ngx-alain',
  year: 2018
};

export const api = {
  base: 'api',
  upload: '/api/file/upload',
  show: '/file/show/',
  down: '/uploads/',
  canton: 'canton/selectselectselect' // 获取区域的默认URL
};

/**
*区域设置
*/
export const canton = {
  id: null, // 默认区域ID
  fdn: null, // 默认区域
  name: null
};

/**
* 富文本编辑器
*/
export const editor = assetsHelper.getCkeditorConfig();

/**
 *默认定义
 */
export const define = {

  // 用户默认图片
  user_images: './assets/images/default/no-user.png',

  // 默认用户的图片
  user_cut_images: './assets/images/user/default_user.png',

  // table page size
  table_page_size: 10

};

/**
 *路由配置
 */
export const router = {
  default: '/app/admin',
  home: '/app/home',
  admin: '/app/admin',
  login: '/passport/login',
  lock: '/passport/lock'
};

export const menus: Menu[] = [{
  'text': '用户登录',
  'hide': true,
  'reuse': false,
  'children': [{
    'text': '安全登录',
    'link': '/passport/login',
    'reuse': false
  },
  {
    'text': '安全锁定',
    'link': '/passport/lock',
    'reuse': false
  }]
}];

/**
 *HTTP配置
 */
export const http = {
  // 数据包发送格式，10是明文 11是密文
  style: 10,

  // 请求验证代码
  check: 'ezhuo@20161016'
};

export const http_code = {
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
  406: '重要：',
  410: '',
  411: '',
  412: '',
  422: '验证：',
  500: '服务器端异常！',
  504: '没有连接到服务器！'
};
