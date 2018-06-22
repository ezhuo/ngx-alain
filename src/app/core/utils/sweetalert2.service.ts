import { Injectable } from '@angular/core';

const myWindow: any = (typeof window !== 'undefined' && window) || {};

@Injectable()
export class SweetAlertService {
  swalObj = myWindow.Sweetalert2;

  constructor() { }

  swal() {
    return myWindow.Sweetalert2(...Array.from(arguments));
  }

  alert(msg: any, timer = null, type: string = 'info') {
    const typeName = {
      info: '信息',
      success: '成功啦',
      error: '错误',
      warning: '警告'
    };
    const defaultOptions = {
      type,
      confirmButtonText: '好',
      confirmButtonColor: '#3085d6',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: true,
      reverseButtons: true,
      title: typeName[type],
      text: msg,
      timer: timer
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, {}));
  }

  confirm(msg: any) {
    const defaultOptions = {
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true,
      reverseButtons: true,
      type: 'warning',
      title: '询问',
      text: msg
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, {}));
  }

  prompt(msg: any, value: any = '') {
    const defaultOptions = {
      confirmButtonText: '确定',
      showCancelButton: true,
      cancelButtonText: '取消',
      input: 'text',
      inputValue: value,
      text: msg
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, {}));
  }

  question(options: any) {
    return this.alert(
      Object.assign(
        {
          type: 'question'
        },
        options
      )
    );
  }

  success(msg: any, timer = null) {
    return this.alert(msg, timer, 'success');
  }

  warning(msg: any, timer = null) {
    return this.alert(msg, timer, 'warning');
  }

  error(msg: any, timer = null) {
    return this.alert(msg, timer, 'error');
  }

  info(msg: any, timer = null) {
    return this.alert(msg, timer, 'info');
  }

  html(html, options = {}) {
    return myWindow.Sweetalert2(Object.assign({
      html: html,
      focusConfirm: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '确定'
    }, options));
  }
}
