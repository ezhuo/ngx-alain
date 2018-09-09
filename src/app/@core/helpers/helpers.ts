import * as objCheck from './object';

export const urlBase64Decode = (str: string): string => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error('Illegal base64url string!');
        }
    }
    return b64DecodeUnicode(output);
};

export const b64decode = (str: string): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
        throw new Error(
            `'atob' failed: The string to be decoded is not correctly encoded.`,
        );
    }

    for (
        // initialize result and counters
        let bc = 0, bs: any, buffer: any, idx = 0;
        // get next character
        (buffer = str.charAt(idx++));
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
        ((bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
};

// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
export const b64DecodeUnicode = (str: any) => {
    return decodeURIComponent(
        Array.prototype.map
            .call(b64decode(str), (c: any) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );
};

export const convertToBoolProperty = (val: any): boolean => {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();

        return val === 'true' || val === '';
    }

    return !!val;
};

export const jsonToURL = (obj: any): string => {
    return (
        '?' +
        Object.keys(obj)
            .map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
            })
            .join('&')
    );
};

export const formatNum = function(num, n) {
    if (typeof num == 'string') {
        num = parseFloat(num);
    }
    num = String(num.toFixed(n));
    const re = /(-?\d+)(\d{10})/;
    while (re.test(num)) num = num.replace(re, '$1,$2');
    return num;
};

/**
 * 将上传组件的值，格式化为字符串
 * 注意：输入数据格式必须为数组
 * @param uploadFile
 */
export const formatUploadFilesToString = function(
    uploadFile: any[] | Object,
): String {
    uploadFile = uploadFile || [];
    if (objCheck.isObject(uploadFile)) {
        uploadFile = [uploadFile];
    }
    if (!objCheck.isArray(uploadFile)) uploadFile = [];
    for (const idx of uploadFile as any[]) {
        if (idx) {
            if (idx.status) {
                delete idx.status;
            }
            if (idx.dt) {
                delete idx.dt;
            }
            if (idx.message) {
                delete idx.message;
            }
        }
    }
    return JSON.stringify(uploadFile);
};

/**
 * 将文件上传的字符串，格式化为数组
 * 输入数据必须为字符串
 * @param uploadFile
 */
export const formatUploadFilesToObject = function(
    uploadFile: string,
): any[] | Object {
    uploadFile = uploadFile || '[]';
    return objCheck.parseJSON(uploadFile);
};

/**
 * 将区域选择组件的值，格式化为字符串
 * 注意：输入数据格式必须为数组
 * @param fdn
 */
export const formatCascaderToString = function(fdn: any[]): String {
    fdn = fdn || [];
    if (objCheck.isObject(fdn)) {
        fdn = [fdn];
    }
    if (!objCheck.isArray(fdn)) fdn = [];
    if (!objCheck.isEmpty(fdn)) {
        return fdn[fdn.length - 1];
    } else {
        return '';
    }
};

/**
 * 将区域选择组件的字符串，格式化为数组
 * 输入数据必须为字符串
 * @param uploadFile
 */
export const formatCascaderToObject = function(fdn: string): any[] {
    fdn = fdn || '[]';
    const arr = fdn.split('.');
    arr.pop();
    let result = [];
    for (let idx = 0; idx < arr.length; idx++) {
        if (idx > 0) result.push(arrConcat(idx));
    }
    if (result.length == 0) result = arr;
    return result;

    function arrConcat(__idx) {
        const r = [];
        arr.forEach((_e, _i) => {
            if (_i <= __idx) {
                r.push(_e);
            }
        });
        r.push('');
        return r.join('.');
    }
};

export const getDate = function(o) {
    let arr, day, month, res;
    if (typeof o === 'object') {
        month = o.getMonth() + 1;
        if (month < 10) {
            month = 0 + '' + month;
        }
        day = o.getDate();
        if (day < 10) {
            day = 0 + '' + day;
        }
        res = [o.getFullYear(), month, day].join('-');
    } else if (typeof o === 'string') {
        arr = o.split('-');
        if (arr[1] < 10) {
            arr[1] = 0 + '' + arr[1];
        }
        if (arr[2] < 10) {
            arr[2] = 0 + '' + arr[2];
        }
        res = arr.join('-');
    }
    return res;
};

// 日期比较,是否第一个时间大于第二个时间
export const dayu_time = function(firstTime, secondTime) {
    if (undefined == firstTime) return false;
    firstTime = Date.parse(firstTime);
    secondTime =
        secondTime == undefined ? new Date().getTime() : Date.parse(secondTime);
    if (firstTime - secondTime > 0) return true;
    else return false;
};

// sDate1和sDate2是2006-12-18格式
export const DateDiff = function(sDate1, sDate2) {
    let aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split('-');
    oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]); // 转换为12-18-2006格式
    aDate = sDate2.split('-');
    oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
    iDays = parseInt('' + Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24, 10); // 把相差的毫秒数转换为天数
    return iDays + 1;
};

// 日期相加
export const addDate = function(date, days) {
    date = date.replaceAll('-', '/');
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return (
        d.getFullYear() +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day)
    );
};

// 是否存在指定变量
export const isExitsVariable = function(variableName) {
    try {
        if (typeof variableName == 'undefined') {
            return false;
        } else {
            return true;
        }
    } catch (e) {}
    return false;
};

// 第一个字母大写
export const ReplaceFirstUper = function(str) {
    str = str.toLowerCase();
    return str.replace(/\b(\w)|\s(\w)/g, function(m) {
        return m.toUpperCase();
    });
};

/**
 * 获取当前URL
 * @param config
 */
export const getUrl = function(config) {
    let result = '';
    config = config || 'root';
    if (config == 'root') {
        result = window.location.protocol + '//' + window.location.host;
    } else if (config == 'href') {
        result = window.location.href;
    }
    return result;
};

/*根据出生日期算出年龄*/
export const getAge = function(strBirthday) {
    let returnAge;
    const strBirthdayArr = strBirthday.split('-');
    const birthYear = strBirthdayArr[0];
    const birthMonth = strBirthdayArr[1];
    const birthDay = strBirthdayArr[2];

    const d = new Date();
    const nowYear = d.getFullYear();
    const nowMonth = d.getMonth() + 1;
    const nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0; // 同年 则为0岁
    } else {
        const ageDiff = nowYear - birthYear; // 年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                const dayDiff = nowDay - birthDay; // 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                const monthDiff = nowMonth - birthMonth; // 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge; // 返回周岁年龄
};

/**
 * 判断字符串为JSON
 * @param str
 * @returns {boolean}
 */
export const isJson = function(str) {
    if (typeof str == 'string') {
        try {
            if (str.indexOf('{') > -1) {
                JSON.parse(str);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
};

/**
 * 判断是否是图片JSON格式
 * @param str
 * @returns {boolean}
 */
export const isImagesJson = function(str) {
    if (typeof str == 'string') {
        try {
            if (str.indexOf('{') > -1 && str.indexOf('lastModifiedDate') > -1) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    return false;
};

export const randomColor = function() {
    const colorArr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
    ];
    let cur;
    let color = '#';
    const randomNum2 = function(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    for (let i = 0; i < 6; i++) {
        cur = randomNum2(15, 0);
        color += colorArr[cur];
    }
    return color;
};

export const randomNum = function(n) {
    n = n || 4;
    let rnd = '';
    for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
    return rnd;
};

/**
 * 潜度获取值
 * @param dict
 * @param v
 */
export const getDict = (dict: any[], val: any | any[]): any => {
    if (!objCheck.isArray(val)) val = [val];
    const res = getDictDeep(dict, val) || [];
    if (res.length < 1) return '-';
    return res.join(' | ');
};

export const getDictObject = (dict: any[], val: any): any => {
    for (const idx of dict) {
        if (idx.value == val) {
            return idx;
        }
    }
    return null;
};

/**
 * 深度获取值
 * @param dict
 * @param val
 */
export const getDictDeep = (dict: any[], val: any[]): any[] => {
    const res = [];
    let flage = 0;
    if (dict && dict.length > 0) {
        for (const item of dict) {
            if (item.value == val[flage]) {
                res.push(item.label || item.title);
                flage++;
                if (item.children && item.children.length > 0) {
                    (function fn(_arr) {
                        const obj = _arr;
                        for (const _item of obj) {
                            if (_item.value == val[flage]) {
                                flage++;
                                res.push(_item.label || item.title);
                                if (
                                    _item.children &&
                                    _item.children.length > 0
                                ) {
                                    return fn(_item.children);
                                }
                            }
                        }
                    })(item.children);
                }
            }
        }
    }
    return res;
};

/**
 * 获取字符串最后一个节点(/app/admin)
 * @param srcStr
 * @param split
 */
export const getLastItemBySplit = (srcStr: string, split: string) => {
    const arr = srcStr.split(split);
    let result = '';
    if (!objCheck.isEmpty(arr)) {
        result = arr[arr.length - 1];
    }
    return result;
};
