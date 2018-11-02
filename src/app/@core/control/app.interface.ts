import { FormGroup } from '@angular/forms';
import { SFSchema, SFUISchema } from '@delon/form';
import { STColumn, STReq } from '@delon/abc';

export interface SchemaData {
  /**
   * 主要的动态表单数据
   */
  main?: SFSchema;
  /**
   * 当前编辑业务的数据结构的排序
   */
  mainOrder?: any[];
  /**
   * 当前编辑业务的数据结构的 UI
   */
  mainUi?: SFUISchema;
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
