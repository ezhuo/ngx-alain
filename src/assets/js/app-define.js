"use strict";

var assetsHelper = {};

__load();

// ---------------------------

function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1; //不是ie浏览器
    }
}

function __load() {
    if (!window.global) {
        window.global = window;
    }

    assetsHelper.ie = IEVersion();
    if (typeof assetsHelper.ie == 'number') {
        if (assetsHelper.ie >= 6 && assetsHelper.ie < 10) {
            __ie_notice(assetsHelper.ie);
        }
    }
}

function __ie_notice(__ver) {
    alert('为了保障系统安全，享受更棒的操作体验，建议您使用 谷歌浏览器、火狐浏览器、 UC浏览器【极速模式】、搜狗高速浏览器【极速模式】、360安全浏览器【极速模式】或者使用新版本IE11浏览器！');
    $('#IENotice').show();
    if (__ver == 9) {
        $('.preloader').remove();
    }
}
