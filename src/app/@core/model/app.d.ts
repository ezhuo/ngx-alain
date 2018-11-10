import { FormGroup } from '@angular/forms';
import { SFSchema, SFUISchema } from '@delon/form';
import { STColumn, STReq } from '@delon/abc';

export interface SchemaData {
  /**
   * 查询业务的数据结构
   */
  search?: SFSchema;
  /**
   * 查询业务的数据结构的排序
   */
  searchOrder?: any[];
  /**
   * 查询业务的数据结构的 UI
   */
  searchUi?: SFUISchema;

  /**
   * 新增/编辑的动态表单数据
   */
  edit?: SFSchema;
  /**
   * 当前新增/编辑业务的数据结构的排序
   */
  editOrder?: any[];
  /**
   * 当前新增/编辑业务的数据结构的 UI
   */
  editUi?: SFUISchema;

  /**
   * 密码动态表单数据
   */
  password?: SFSchema;
  /**
   * 当前新增/编辑业务的数据结构的排序
   */
  passwordOrder?: any[];
  /**
   * 当前新增/编辑业务的数据结构的 UI
   */
  passwordUi?: SFUISchema;
}

export interface TableData {
  /**
   * 主要表单的列
   */
  col?: STColumn[];

  /**
   * 表格附加参数
   */
  req?: STReq;
}

export interface FormData {
  /**
   * 主要表单
   */
  group?: FormGroup;

  /**
   * 主要表单值
   */
  data?: any;
}

/**
 * 数据集传值
 */
export interface DataSource {
  /**
   * 主要的URL
   */
  url?: string;

  /**
   * 主键KEY
   */
  key?: string;

  /**
   * 主键值
   */
  val?: any;
}

export interface ModalButtonConfig {
  submit?: any;
  reset?: any;
  close?: any;
}

/**
 * modal 对话框传值
 */
export interface ModalData {
  button?: ModalButtonConfig;
  title?: any;
  data?: any;
}

/**
 * 页面传值
 */
export interface PageData {
  title?: any;
}
