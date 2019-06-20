import { STColumn } from '@delon/abc';

export interface Http {
  style: number;
  check: string;
}

export interface Canton {
  id: string; // 默认区域ID
  fdn: string; // 默认区域
  name: string; // 区域名称
}

export interface Router {
  defaultRoute: string;
  defaultUrl: string;
  home: string;
  admin: string;
  login?: string;
  lock?: string;
}

export interface Api {
  base: string;
  upload: string;
  uploadImg: string;
  show: string;
  down: string;
  canton: string; // 获取区域的默认URL
}

export interface Define {
  tableIndexColumn?: STColumn;
  tablePageSize?: number; // table page size
  userImages: string; // 用户默认图片
  userCutImages: string; // 默认用户的图片
  logoLogin: string;
  logoTopLarge: string;
  logoTopSmall: string;
  caseFileType: string;
  caseFileTip: string;
}
