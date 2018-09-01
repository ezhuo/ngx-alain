/**
 * 判断类型
 * @param {*} o
 */
const typeCheck = function(o) {
    const s = Object.prototype.toString.call(o);
    return s
        .match(/\[object (.*?)\]/)[1]
        .toLowerCase()
        .trim();
};

const isTypeCheck = function(typeName, obj) {
    // console.log(typeName);
    return (
        typeName
            .toLowerCase()
            .slice(2)
            .trim() === typeCheck(obj)
    );
};

export const isNull = obj => {
    return isTypeCheck('isNull', obj);
};

export const isUndefined = obj => {
    return isTypeCheck('isUndefined', obj);
};

export const isObject = obj => {
    return isTypeCheck('isObject', obj);
};

export const isArray = obj => {
    return isTypeCheck('isArray', obj);
};

export const isString = obj => {
    return isTypeCheck('isString', obj);
};

export const isNumber = obj => {
    return isTypeCheck('isNumber', obj);
};

export const isBoolean = obj => {
    return isTypeCheck('isBoolean', obj);
};

export const isFunction = obj => {
    return isTypeCheck('isFunction', obj);
};

export const isRegExp = obj => {
    return isTypeCheck('isRegExp', obj);
};

export const isEmpty = obj => {
    if (obj == null || obj === undefined) return true;

    if (isObject(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    if (isArray(obj)) {
        return obj.length === 0;
    }

    return !Boolean(obj);
};

export const ifEmpty = (obj, val) => {
    return isEmpty(obj) ? val : obj;
};

export const getNow = () => {
    return '';
};

export const parseJSON = obj => {
    if (obj == null || obj === undefined) {
        return obj;
    }
    try {
        return JSON.parse(obj);
    } catch (e) {
        console.error(obj, e);
        return null;
    }
};

export const arrayUnique = (arr: Array<any>): Array<any> => {
    return Array.from(new Set(arr));
};
