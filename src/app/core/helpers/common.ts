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
  return (
    typeName
      .toLowerCase()
      .slice(2)
      .trim() === typeCheck(obj)
  );
};

export function isNull(obj) {
  return isTypeCheck(isNull.name, obj);
}

export function isUndefined(obj) {
  return isTypeCheck(isUndefined.name, obj);
}

export function isObject(obj) {
  return isTypeCheck(isObject.name, obj);
}

export function isArray(obj) {
  return isTypeCheck(isArray.name, obj);
}

export function isString(obj) {
  return isTypeCheck(isString.name, obj);
}

export function isNumber(obj) {
  return isTypeCheck(isNumber.name, obj);
}

export function isBoolean(obj) {
  return isTypeCheck(isBoolean.name, obj);
}

export function isFunction(obj) {
  return isTypeCheck(isFunction.name, obj);
}

export function isRegExp(obj) {
  return isTypeCheck(isRegExp.name, obj);
}

export function IsEmpty(obj) {
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
}

export function getNow() {
  return '';
}

export function parseJSON(obj) {
  if (obj == null || obj === undefined) {
    return obj;
  }
  try {
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
}
