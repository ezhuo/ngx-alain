import { App } from '@delon/theme';

export const app_debug = false;

export const app_debug_error = true;

export const app: App = {
    name: '智慧党建云平台',
    short: '智慧党建',
    description: '智慧党建云平台',
    key: 'dangjian',
    year: 2018
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
*路由配置
*/
export const router = {
    default: '/app/admin',
    home: '/app/home',
    admin: '/app/admin'
};
