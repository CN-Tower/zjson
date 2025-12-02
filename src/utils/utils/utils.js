/*!
 * 一个通用函数工具库，源于业务、扎根业务。
 */
/**
 * 约定常量
 */
// 缓存对象名称
var UTILS_CACHE = '__utils_cache';

// 缓存样式名称
var CACHED_STYLES = '__utils_styles';

// 缓存脚本名称
var CACHED_SCRIPTS = '__utils_scripts';

/**
 * 符号设定
 */
// ID限定字符
var ID_CHAR_SET = {
  number: '0123456789',
  letter: 'abcdefghijklmnopqrstuvwxyz',
  special: '~`!@#$%^&*()-_+=[]{};:"\',<.>/?'
};

// 转义符号列表
var HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

// 反转义符号列表
var HTML_UNESCAPES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#96;': '`'
};

/**
 * 时间常量
 */
// 时间-一天的毫秒数：86400000 = 1000 * 60 * 60 * 24
var DAY_TIME = 864e5;

// 时间-一天的毫秒数减一
var DAY_TIME_1 = 86399999;

/**
 * 常用正则
 */
// 正则-手机号码
var RE_PHONE = /^(\+?0?86-?)?1[3456789]\d{9}$/;

// 正则-座机号码
var RE_TEL = /^((\d{3,4})|\d{3,4}-)?\d{7,8}?$/;

// 正则-邮箱
var RE_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// 正则-邮政编码
var RE_ZIP_CODE = /^[1-9]\d{5}(?!\d)$/;

// 正则-腾讯QQ号
var RE_QQ = /^[1-9][0-9]{4,}$/;

// 正则-一代身份证号码15位
var RE_ID_CARD_V1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

// 正则-二代身份证号码18位
var RE_ID_CARD_V2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;

// 正则-身份证号码
var RE_ID_CARD = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;

// 正则-一年12个月
var RE_MONTH = /^(0?[1-9]|1[0-2])$/;

// 正则-一月的31天
var RE_MONTH_DAY = /^((0?[1-9])|((1|2)[0-9])|30|31)$/;

// 正则-UUID
var RE_UUID = /^[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}$/;

// 正则-双字节字符
var RE_DB_CHAR = /^[^x00-xff]*$/;

// 正则-汉字
var RE_CN_CHAR = /^[\u4e00-\u9fa5]*$/;

// 正则-Base64
var RE_BASE64 = /^((data:.*;)?base64,)?([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

// 正则-IPv4
var RE_IPV4 = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

// 正则-域名
var RE_DOMAIN = /^([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}$/;

// 正则-端口
var RE_PROT = /^[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]$/;

// 正则-URL链接后缀
var RE_URL_SUFFIX = /^[-0-9a-zA-Z+&@#/%=~_|?!:,.;]*$/;

// 正则-IP或域名链接
var RE_URL = /^(https?:)?(\/\/)?(((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1-6})?([-0-9a-zA-Z+&@#/%=~_|?!:,.;]*)?$/;

// 正则-IP URL链接
var RE_URL_IP = /^(https?:)?\/\/((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)(:[0-9]{1-6})?([-0-9a-zA-Z+&@#/%=~_|?!:,.;]*)?$`/;

// 正则-URL域名链接
var RE_URL_DOMAIN = /^(https?:)?\/\/([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}(:[0-9]{1-6})?([-0-9a-zA-Z+&@#/%=~_|?!:,.;]*)?$`/;

var consts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  UTILS_CACHE: UTILS_CACHE,
  CACHED_STYLES: CACHED_STYLES,
  CACHED_SCRIPTS: CACHED_SCRIPTS,
  ID_CHAR_SET: ID_CHAR_SET,
  HTML_ESCAPES: HTML_ESCAPES,
  HTML_UNESCAPES: HTML_UNESCAPES,
  DAY_TIME: DAY_TIME,
  DAY_TIME_1: DAY_TIME_1,
  RE_PHONE: RE_PHONE,
  RE_TEL: RE_TEL,
  RE_EMAIL: RE_EMAIL,
  RE_ZIP_CODE: RE_ZIP_CODE,
  RE_QQ: RE_QQ,
  RE_ID_CARD_V1: RE_ID_CARD_V1,
  RE_ID_CARD_V2: RE_ID_CARD_V2,
  RE_ID_CARD: RE_ID_CARD,
  RE_MONTH: RE_MONTH,
  RE_MONTH_DAY: RE_MONTH_DAY,
  RE_UUID: RE_UUID,
  RE_DB_CHAR: RE_DB_CHAR,
  RE_CN_CHAR: RE_CN_CHAR,
  RE_BASE64: RE_BASE64,
  RE_IPV4: RE_IPV4,
  RE_DOMAIN: RE_DOMAIN,
  RE_PROT: RE_PROT,
  RE_URL_SUFFIX: RE_URL_SUFFIX,
  RE_URL: RE_URL,
  RE_URL_IP: RE_URL_IP,
  RE_URL_DOMAIN: RE_URL_DOMAIN
});

/**
 * 获取构建版本
 */
var version = '3.2.12';

/**
 * 判断一个变量是不是手机号
 * @param {*} value
 *
 * @example
 * isPhone('13570347570');  // => true
 * isPhone('2471150552');   // => false
 */
function isPhone(value) {
  return RE_PHONE.test(value);
}

/**
 * 判断一个变量是不是邮箱地址
 * @param {*} value
 *
 * @example
 * isEmail('abc@blabla.com); // => true
 * isEmail('abc.blabla.com); // => false
 */
function isEmail(value) {
  return RE_EMAIL.test(value);
}

/**
 * 判断一个变量是不是身份证号码
 * @param {*} value
 *
 * @example
 * isIdCard('632123820927051');    // => true
 * isIdCard('22082119800801002x'); // => true
 */
function isIdCard(value) {
  return RE_ID_CARD.test(value);
}

/**
 * 判断一个变量是不是url链接
 * @param {*} value
 *
 * @example
 * isUrl('https://www.blabla.com'); // => true
 */
function isUrl(value) {
  return RE_URL.test(value);
}

/**
 * 判断一个变量是不是一个Ipv4地址
 * @param {*} value
 *
 * @example
 * isIpv4('127.0.0.1');  // => true
 * isIpv4('::1/128');    // => false
 */
function isIpv4(value) {
  return RE_IPV4.test(value);
}

/**
 * 判断一个变量是不是由汉字组成
 * @param {*} value
 *
 * @example
 * isCnChar('吧啦吧啦');  // => true
 * isCnChar('blabla'); // => false
 */
function isCnChar(value) {
  return RE_CN_CHAR.test(value);
}

/**
 * 判断一个变量是不是由双字节字符组成
 * @param {*} value
 *
 * @example
 * isDbChar('吧啦吧啦');  // => true
 * isDbChar('blabla'); // => false
 */
function isDbChar(value) {
  return RE_DB_CHAR.test(value);
}

/**
 * 判断一个变量是不是base64字符串
 * @param {*} value
 *
 * @example
 * isBase64('MTIz'); // => true
 * isBase64('123');  // => false
 */
function isBase64(value) {
  return RE_BASE64.test(value);
}

/**
 * 判断一个变量是否为数组
 * @param {*} value
 * @returns {boolean}
 */
function isArr(value) {
  return value instanceof Array;
}

/**
 * 获取变量toString后去掉中括号和object的值
 * @param {*} value
 * @returns
 *
 * toRowType([]);  // => 'Array'
 * toRowType({});  // => 'Object'
 */
function toRowType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * 判断一个变量是否为对象
 * @param {*} value
 * @returns {boolean}
 */
function isObj(value) {
  return toRowType(value) === 'Object';
}

/**
 * 判断一个变量是否为函数
 * @param {*} value
 * @returns {boolean}
 */
function isFun(value) {
  return typeof value === 'function';
}

/**
 * 判断一个变量是否为字符串
 * @param {*} value
 * @returns {boolean}
 */
function isStr(value) {
  return typeof value === 'string';
}

/**
 * 判断一个变量是否为布尔值
 * @param {*} value
 * @returns {boolean}
 */
function isBol(value) {
  return typeof value === 'boolean';
}

/**
 * 判断一个变量是否为数值
 * @param {any} value 需要判断的值
 * @param {boolean} isLoose 是否可包含NaN或无限
 * @returns {boolean}
 *
 * isNum(999);             // => true;
 * isNum(0.1);             // => true;
 * isNum(NaN);             // => false;
 * isNum(NaN, true);       // => true;
 * isNum(Infinity);        // => false;
 * isNum(Infinity, true);  // => true;
 * isNum('abc');           // => false;
 * isNum('abc', true);     // => false;
 */
function isNum(value, isLoose) {
  var isNumType = typeof value === 'number';
  if (isLoose) return isNumType;
  return isNumType && !Number.isNaN(value) && Number.isFinite(value);
}

/**
 * 判断一个变量是否为null
 * @param {*} value
 * @returns {boolean}
 */
function isNul(value) {
  return value === null;
}

/**
 * 判断一个变量是否为undefined
 * @param {*} value
 * @returns {boolean}
 */
function isUdf(value) {
  return value === undefined;
}

/**
 * 判断一个变量是否为undefined或null
 * @param {*} value
 * @returns {boolean}
 */
function isUdfNul(value) {
  return value === undefined || value === null;
}

/**
 * 生成一个指定长度和填充的数组
 * @param length 长度
 * @param value 填充值或填充函数
 *
 * @example
 * array();              // => []
 * array(5);             // => [0, 1, 2, 3, 4]
 * array(5, '');         // => ['', '', '', '', '']
 * array(5, i => i * i); // => [0, 1, 4, 9, 16]
 */
function array(length, value) {
  var arr = [],
    val = 0,
    i = -1;
  while (++i < length) {
    if (isUdf(value)) {
      arr.push(val++);
    } else if (isFun(value)) {
      arr.push(value(i));
    } else {
      arr.push(value);
    }
  }
  return arr;
}

/**
 * 任意类型转数组类型
 * @param value
 *
 * @example
 * toArray(123);   // => [ 123 ]
 * toArray([ 123 ]); // => [ 123 ]
 */
function toArray(value) {
  return isArr(value) ? value : [value];
}

/**
 * 生成一个由参数元组构组成的数组
 *
 * @example
 *
 * const colors = tulpeArray('blue', 'pink');  // => ['blue', 'pink']
 * const ColorType = ElementOf<typeof colors>; // => 'blue' | 'pink'
 */
function tulpeArray() {
  return [].slice.call(arguments);
}

/**
 * 数组或字符串去重
 * @param {Array|string} value
 * @param {boolean|Array} condition Array，表示按数组元素属性去重；boolean，表示是否不匹配数组元素的类型
 *
 * @returns {*}
 *
 * @example
 * unique('abbcddefaa');             // => 'abcdef'
 * unique(['a', 'b', 'a', 'd']);     // => ['a', 'b', 'd']
 * unique([1, 3, 1, 5, '1']);        // => [1, 3, 5, '1']
 * unique([1, 3, 1, 5, '1'], true);  // => [1, 3, 5]
 *
 * const arr = [
 *   {name: 'Tom', age: 28},
 *   {name: 'Bob', age: 28},
 *   {name: 'Tom', age: 32},
 * ]
 * unique(arr, ['age']);  // => [{name: 'Tom', age: 28}, {name: 'Tom', age: 32}]
 */
function unique(value, condition) {
  var isValStr = isStr(value);
  if (isValStr) value = value.split('');
  if (!isArr(value)) value = [];
  var arr = value.slice();
  var i = -1;
  while (++i < arr.length) {
    var j = i;
    var _loop = function _loop() {
      var ai = arr[i],
        aj = arr[j],
        isCdArr = isArr(condition);
      // eslint-disable-next-line
      var isDup = !isCdArr && (condition ? ai == aj : ai === aj) || isCdArr && condition.some(function (p) {
        return ai && aj && !isUdf(ai[p]) && ai[p] === aj[p];
      });
      if (isDup) arr.splice(j--, 1);
    };
    while (++j < arr.length) {
      _loop();
    }
  }
  return isValStr ? arr.join('') : arr;
}

/**
 * 随机生成一个指定范围的数字
 * @param {number} start 随机数范围开始（包含）
 * @param {number} end 随机数范围结束（不包含）
 * @param {boolean} isFloat 是否浮点数
 * @returns {number}
 *
 * @example
 * randomNum()            // => 0.6765722889615231 (随机)
 * randomNum(5)           // => 4 (随机，0-4)
 * randomNum(1,5)         // => 2 (随机，1-4)
 * randomNum(1, 2, true)  // => 1.804401447296491 (随机)
 *
 * // 随机获取数组的元素
 * const arr = ['a', 'b', 'c', 'd'];
 * arr[randomNum(arr.length)];  // => 'c' (随机)
 */
function randomNum(start, end, isFloat) {
  var random = Math.random();
  if (!isNum(start)) return random;
  if (isBol(end)) isFloat = end;
  var rdNum;
  if (!isNum(end) || end === start) {
    rdNum = random * start;
  } else {
    rdNum = random * (end - start) + start;
  }
  return isFloat ? rdNum : Math.floor(rdNum);
}

/**
 * 数组或字符串随机排序
 * @param {Array|string} value
 * @returns
 *
 * @example
 * shuffle('abcdefg');             // => 'gcfaebd'
 * shuffle(['a', 'b', 'c', 'd']);  // => ['b', 'a', 'd', 'c']
 */
function shuffle(value) {
  var isValStr = isStr(value);
  if (isValStr) value = value.split('');
  if (!isArr(value)) value = [];
  var array = value.slice();
  var arr = [];
  while (array.length) {
    var rdIndex = randomNum(array.length);
    arr = arr.concat(array.splice(rdIndex, 1));
  }
  return isValStr ? arr.join('') : arr;
}

/**
 * 把有结构的数组打散，减少层数
 * @param array 需要打散的数组
 * @param deep 是否深度打散
 *
 * flatten([1, [2, 3], [4, 5]]);       // => [1, 2, 3, 4, 5]
 * flatten([1, [2, [3, 4]], 5]);       // => [1, 2, [3, 4], 5]
 * flatten([1, [2, [3, 4]], 5], true); // => [1, 2, 3, 4, 5]
 */
function flatten(array, deep) {
  if (!isArr(array)) return [];
  var arr = [];
  array.forEach(function (item) {
    if (isArr(item)) {
      arr = arr.concat(deep ? flatten(item, true) : item);
    } else {
      arr.push(item);
    }
  });
  return arr;
}

/**
 * 搜索目标值在数组或字符串中的位置
 * @param {string|Array} collection
 * @param {*} predicate
 * @returns {number}
 *
 * findIndex('abcdefg', 'cd');                   // => 2
 * const users = [{name: 'Tom'}, {name: 'Bob'}];
 * findIndex(users, u => u.name === 'Bob');      // => 1
 * findIndex(users, u => u.name === 'Jerry');    // => -1
 */
function findIndex(collection, predicate) {
  var isPrdFun = isFun(predicate);
  if (isPrdFun && isStr(collection)) {
    collection = collection.split('');
  }
  if (isPrdFun && isArr(Array)) {
    var i = -1;
    while (++i < collection.length) {
      if (predicate(collection[i], i)) return i;
    }
    return -1;
  }
  return (collection || '').indexOf(predicate);
}

/**
 * 判断值是否在数组、字符串或对象的key中
 * @param {string|Array|Object} collection
 * @param {*} predicate
 * @returns
 */
function includes(collection, predicate) {
  if (isObj(collection)) {
    collection = Object.keys(collection);
  }
  return findIndex(collection, predicate) > -1;
}

/**
 * 根据路径获取对象属性
 * @param {*} object 目标对象
 * @param {string|string[]} path 属性路径，可以用'.'或'/'分隔或路径数组
 * @param {*} defaultVal 默认值，不传为undefine
 * @returns {*}
 *
 * const obj = {
 *   name: 'obj', bol: true, num: 0, ptn: /abc/,
 *   arr: [{ name: 'arr0' }, { name: 'arr2' }],
 *   subObj: { name: 'subObj', innerObj: { name: 'innerObj', age: 18 } }
 * }
 *
 * get(obj, 'name');                 // => 'obj'
 * get(obj, 'subObj.innerObj.name'); // => 'innerObj'
 * get(obj, 'subObj.innerObj.age');  // => 18
 * get(obj, 'subObj/outerObj/name'); // => undefined
 * get(obj, 'arr/0/name');           // => 'arr0'
 * get(obj, 'arr.1.age', 20);        // => 20
 * get(obj, 'arr.1.name', 'Tom');    // => 'arr2'
 * get(obj, 'bol.name');             // => 'undefined'
 */
function get(object, path, defaultVal) {
  if (isUdf(object) || !isStr(path) && !isArr(path)) {
    return defaultVal;
  }
  var paths = isStr(path) ? path.split(/\//.test(path) ? '/' : '.') : path;
  var pathList = paths.filter(function (p) {
    return !!p || p === 0;
  });
  var prop = pathList.shift();
  prop = isUdf(prop) ? '' : String(prop).replace(/^\s*|\s*$/g, '');
  if (!prop) {
    return object;
  }
  if (!object || typeof object !== 'object') {
    return defaultVal;
  }
  var value = object[prop];
  if (isUdf(value)) return defaultVal;
  return pathList.length ? get(value, pathList, defaultVal) : value;
}

/**
 * 深拷贝一个对象或数组
 * @param {*} object 需要深拷贝的对象
 *
 * const obj = { str: 'string', obj: {}, arr: [] };
 * const obj2 = deepCopy(obj);        // => { str: 'string', obj: {}, arr: [] }
 * console.log(obj === obj2);         // false
 * console.log(obj.obj === obj2.obj); // false
 * console.log(isDeepEqual(obj === obj2)); // true
 */
function deepCopy(object) {
  var stack = [];
  var copy = function copy(obj) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    if (isArr(obj)) {
      return obj.map(function (item) {
        return copy(item);
      });
    }
    if (stack.indexOf(obj) > -1) {
      return obj.constructor && "[".concat(obj.constructor.name, "]");
    }
    stack.push(obj);
    var copied = {};
    Object.keys(obj).forEach(function (prop) {
      return copied[prop] = copy(obj[prop]);
    });
    return copied;
  };
  return copy(object);
}

/**
 * 选取对象的部分属性创建一个新对象
 * @param {Object} object
 * @param {Array} props
 * @param {boolean} isDeep
 * @returns
 *
 * @example
 * const mrTom = {
 *   name: 'Tom',
 *   age: 20,
 *   gender: 'male',
 *   hobby: ['reading', 'running'],
 * }
 * pick(mrTom, ['name', 'age', 'gender']); // => {name: 'Tom', age: 20, gender: 'male'};
 */
function pick(object, props, isDeep) {
  object = object || {};
  if (!isArr(props)) props = [];
  var obj = {};
  props.forEach(function (prop) {
    if (object.hasOwnProperty(prop)) {
      obj[prop] = isDeep ? deepCopy(object[prop]) : object[prop];
    }
  });
  return obj;
}

/**
 * 去除对象的部分属性创建一个新对象
 * @param {Object} object
 * @param {Array} props
 * @param {boolean} isDeep
 * @returns
 *
 * @example
 * const mrTom = {
 *   name: 'Tom',
 *   age: 20,
 *   gender: 'male',
 *   hobby: ['reading', 'running'],
 * }
 * omit(mrTom, ['gender', 'hobby']); // => {name: 'Tom', age: 20}
 */
function omit(object, props, isDeep) {
  object = object || {};
  if (!isArr(props)) props = [];
  var obj = {};
  Object.keys(object).forEach(function (prop) {
    if (props.indexOf(prop) === -1) {
      obj[prop] = isDeep ? deepCopy(object[prop]) : object[prop];
    }
  });
  return obj;
}

/**
 * 判断两个对象或数组内容是否相等
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 *
 * isDeepEqual([1,2], [1,2]); // => true;
 * isDeepEqual({name: 'Tom', age: 18}, {name: 'Tom', age: 20});  // => false
 */
function isDeepEqual(obj1, obj2) {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  if (isArr(obj1) && isArr(obj2)) {
    if (obj1.length !== obj2.length) return false;
    if (obj1.length) {
      return obj1.every(function (item, i) {
        return isDeepEqual(item, obj2[i]);
      });
    }
    return true;
  }
  if (isObj(obj1) && isObj(obj2)) {
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    if (keys1.length) {
      return keys1.every(function (item, i) {
        if (keys2[i] !== item) return false;
        return isDeepEqual(obj1[item], obj2[item]);
      });
    }
    return true;
  }
  return obj1 === obj2;
}

/**
 * 格式化值的输出为字符串模板
 * @param {*} value
 * @returns {string}
 */
function pretty(value) {
  if (typeof value === 'object' && toRowType(value) !== 'Symbol') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

/**
 * 防抖函数，目标函数在一段时间内未调用才能再次调用
 * @param {Function} func 目标函数
 * @param {number} wait 防抖时间
 * @param {boolean} immediate 是否立即调用，默认：true
 * @param {boolean} lastcall 结束后是否需要调用，默认：true
 * @param {boolean} leakcall 一定时间内也能调用，默认：false
 * @returns {Function}
 *
 * const logNum = debounce(() => console.log(1), 1000);
 * logNum();                         // => 1
 * logNum();                         // => 无打印
 * setTimeout(() => logNum(), 500);  // => 无打印
 * setTimeout(() => logNum(), 2000); // => 1
 */
function debounce(func, wait, immediate, lastcall, leakcall) {
  if (lastcall !== false) lastcall = true;
  if (immediate !== false) immediate = true;
  var previous = 0;
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    var timeoutToCall = function timeoutToCall() {
      if (!leakcall) {
        clearTimeout(timer);
        timer = null;
      }
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          func.apply(context, args);
        }, wait);
      }
    };
    if (now - previous > wait) {
      previous = now;
      if (immediate) {
        func.apply(context, args);
      } else if (lastcall) {
        timeoutToCall();
      }
    } else {
      previous = now;
      if (lastcall) timeoutToCall();
    }
  };
}

/**
 * 节流函数，目标函数在一个时间段之内只能被调用一次
 * @param {Function} func 目标函数
 * @param {number} wait 节流时间
 * @param {boolean} immediate 是否立即调用，默认：true
 * @param {boolean} lastcall 结束后是否需要调用，默认：true
 * @returns {Function}
 *
 * const logNum = throttle(() => console.log('called'), 1000);
 *
 * // 间隔200毫秒调一次，共调用20次，但只会打印4次'called'
 * let callTimes = 0;
 * const timer = setInterval(() => {
 *   console.log('callTimes', ++callTimes);
 *   logNum();
 * }, 200);
 * setTimeout(() => clearInterval(timer), 4000);
 */
function throttle(func, wait, immediate, lastcall) {
  return debounce(func, wait, immediate, lastcall, true);
}

var charNb = ID_CHAR_SET.number;
var charLower = ID_CHAR_SET.letter;
var charUpper = charLower.toUpperCase();
var charSpecial = ID_CHAR_SET.special;

/**
 * 随机生成一个字符串ID
 * @param {*} length
 * @param {*} charSet
 * [*] 表示 0-9a-zA-Z和特殊字符组合，不可组合
 * [s] 表示随机特殊字符，可组合
 * 0-9 表示0-9的随机值，可组合
 * a-z 表示a-z的随机值，可组合
 * A-Z 表示A-Z的随机值，可组合
 * @returns {string}
 *
 * randomId();              // => '4LOC8VP7ATDP' (随机)
 * randomId(18);            // => 'CCG7F097IBFX472RYR' (随机)
 * randomId(10, '0-9[s]');  // => '0#0_49' (随机)
 * randomId('a-z_-');       // => 'm_u_l--axfgh' (随机)
 * randomId('a-zA-Z');      // => 'EwOObdxHzrMn' (随机)
 * randomId('[*]');         // => 'uET6nQ_*6%P~' (随机)
 */
function randomId(length, charSet) {
  if (isStr(length)) charSet = length;
  if (!isNum(length)) length = 12;
  var chars = '';
  if (!charSet || !isStr(charSet)) {
    chars = charNb + charUpper;
  } else if (charSet === '[*]') {
    chars = charNb + charLower + charUpper + charSpecial;
  } else if (charSet.match(/0-9|a-z|A-Z|\[s\]/)) {
    if (/0-9/.test(charSet)) chars += charNb;
    if (/a-z/.test(charSet)) chars += charLower;
    if (/A-Z/.test(charSet)) chars += charUpper;
    if (/\[s\]/.test(charSet)) chars += charSpecial;
    chars += unique(charSet.replace(/0-9|a-z|A-Z|\[s\]/g, ''));
  } else {
    chars = charSet;
  }
  var str = '';
  var i = -1;
  while (++i < length) str += chars[randomNum(chars.length)];
  return str;
}

/**
 * 随机生成一个16进制颜色值
 * @returns {string}
 *
 * @example
 * randomColor(); // => '#bb655b'
 */
function randomColor() {
  return "#".concat("00000".concat((randomNum(0x1000000) << 0).toString(16)).slice(-6));
}

/**
 * 获取字符串的哈希值
 * @param {string} string
 * @returns
 */
function getStringHash(string) {
  var hash = 0;
  var i = -1;
  var _char;
  if (string.length === 0) return hash;
  // Convert to 32bit integer
  while (++i < string.length) {
    _char = string.charCodeAt(i);
    hash = (hash << 5) - hash + _char;
    hash |= 0;
  }
  return Math.abs(hash) * 10 + string.length % 10;
}

/**
 * 比较两个版本号的大小
 * @param {string} v1
 * @param {string} v2
 * @returns {0|1|-1} 0表示v1 = v2，1表示v1 > v2，-1表示v1 < v2
 *
 * compareVersion('1.1.0', '1.1.0');      // => 0
 * compareVersion('1.20.0', '1.2.20');    // => 1
 * compareVersion('v2.0.30', 'v1.9.10');  // => 1
 * compareVersion('v1.1.40', 'v1.2.0');   // => -1
 */
function compareVersion(v1, v2) {
  var cpResult;
  var i = 0;
  var arr1 = v1.replace(/[^0-9.]/, '').split('.');
  var arr2 = v2.replace(/[^0-9.]/, '').split('.');
  while (true) {
    var s1 = arr1[i];
    var s2 = arr2[i++];
    if (s1 === undefined || s2 === undefined) {
      cpResult = arr1.length - arr2.length;
      break;
    }
    if (s1 === s2) continue;
    cpResult = s1 - s2;
    break;
  }
  // eslint-disable-next-line
  return cpResult > 0 ? 1 : cpResult === 0 ? 0 : -1;
}

/**
 * 获取url中的查询参数
 * @param {*} url
 * @returns
 */
function parseQueryString(url) {
  if (!isStr(url)) url = '';
  var params = {};
  if (url.indexOf('=') > -1) {
    var queryStr = url.indexOf('?') > -1 ? url.substring(url.lastIndexOf('?') + 1) : url;
    if (queryStr) {
      var querys = queryStr.split('&');
      for (var i = 0; i < querys.length; i++) {
        var keyVal = querys[i].split('=');
        var key = keyVal[0];
        var val = keyVal[1];
        var decode = decodeURIComponent;
        if (key) params[decode(key)] = decode(val || '');
      }
    }
  }
  return params;
}

/**
 * 把对象编译成Url参数
 * @param {Object} data
 */
function stringifyQueryString(data) {
  if (!isObj(data)) return '';
  var obj = JSON.parse(JSON.stringify(data));
  if (!Object.keys(obj).length) return '';
  var pairs = [];
  var encode = encodeURIComponent;
  var setObjVal = function setObjVal(key, val) {
    Object.keys(val).forEach(function (k) {
      var v = val[k];
      var newKey = key ? "".concat(key, "[").concat(k, "]") : k;
      if (isObj(v) || isArr(v)) {
        setObjVal(newKey, v);
      } else {
        pairs.push("".concat(encode(newKey), "=").concat(encode(v)));
      }
    });
  };
  setObjVal('', obj);
  return pairs.join('&');
}

/**
 * 转义HTML字符
 * @param {string} html
 *
 * escapeHtml('<a href="">点我</a>'); // => '&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'
 */
function escapeHtml(html) {
  return html.replace(/[&<>"'``]/g, function (tag) {
    return HTML_ESCAPES[tag] || tag;
  });
}

/**
 * 反转义HTML字符
 * @param {string} str
 *
 * unescapeHtml('&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'); // => '<a href="">点我</a>'
 */
function unescapeHtml(str) {
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#96;/g, function (tag) {
    return HTML_UNESCAPES[tag] || tag;
  });
}

/**
 * 格式化一个数字为万或亿
 * @param {string|number} num
 * @param {boolean} isZhTw
 * @returns
 */
function formatNum(num, isZhTw) {
  var intNum = parseInt(num, 10);
  if (Number.isNaN(intNum) || intNum < 0) {
    return '';
  }
  if (intNum >= 10000 && intNum < 100000000) {
    return (intNum / 10000).toFixed(1) + (isZhTw ? '萬' : '万');
  }
  if (intNum >= 100000000) {
    return (intNum / 100000000).toFixed(1) + (isZhTw ? '億' : '亿');
  }
  if (/\./.test(num)) {
    return num;
  }
  return intNum;
}

/**
 * 格式化金钱，隔三位以逗号隔开
 * @param {*} amount
 * @param {*} digit
 * @returns {string}
 *
 * formatMoney();      // => '0.00'
 * formatMoney(99, 1); // => '99.0'
 * formatMoney(1999);  // => '1,999.00'
 * formatMoney(100000000);  // => '100,000,000.00'
 */
function formatMoney(amount, digit) {
  amount = amount || 0;
  if (digit === undefined) digit = 2;
  var amountArr = String(amount.toFixed(digit)).split('.');
  var _int = amountArr[0];
  var decimal = amountArr[1] || '';
  var spNum = Math.floor(_int.length / 3);
  var spIdx = _int.length % 3;
  var spStr = _int.substr(0, spIdx);
  var i = -1;
  while (++i < spNum) {
    spStr += i === 0 && (spStr === '-' || !spStr) ? _int.substr(spIdx, 3) : ",".concat(_int.substr(spIdx, 3));
    spIdx += 3;
  }
  return decimal ? "".concat(spStr, ".").concat(decimal) : spStr;
}

/**
 * 裁切字符串，超出部分以超出符代替
 * @param {*} string 原字符串
 * @param {*} length 限定长度
 * @param {*} omission  超出符，默认为：...
 *
 * cutString('测试字符串裁切函数，过长溢出显示省略', 20);                     // => '测试字符串裁切函数，...'
 * cutString('Test cutString function, overflow display omission', 20); // => 'Test cutString fun...'
 */
function cutString(string, length, omission) {
  if (omission === undefined) omission = '...';
  if (!isNum(length)) return string;
  var tmpChar;
  var tmpStr = '';
  var count = 0;
  var hasRest = false;
  var i = -1;
  while (++i < string.length) {
    if (count >= length) {
      hasRest = true;
      break;
    }
    tmpChar = string.substr(i, 1);
    tmpStr += tmpChar;
    count += RE_DB_CHAR.test(tmpChar) ? 2 : 1;
  }
  return tmpStr + (hasRest ? omission : '');
}

/**
 * 给字符串指定位置打码
 * @param {string} string 需要打码字符串
 * @param {number} start 开始位置
 * @param {number} length 打码长度
 * @param {string} mask 打码符号，默认: *
 * @returns {string}
 *
 * @example
 * maskString('13878822602', 2);     // => '13*********'
 * maskString('13878822602', 3, 4);  // => '138****2602'
 * maskString('13878822602', 3, 4, x);  // => '138xxxx2602'
 */
function maskString(string, start, length, mask) {
  var str = String(string);
  if (!isNum(start)) return str;
  if (isStr(length)) {
    mask = length;
    length = undefined;
  }
  if (!isStr(mask)) mask = '*';
  var maskStr = str.substr(start, length).replace(/[^\u4e00-\u9fa5]/gm, mask).replace(/[\u4e00-\u9fa5]/gm, mask + mask);
  var prefix = str.substr(0, start);
  var suffix = isUdf(length) ? '' : str.substr(start + length);
  return prefix + maskStr + suffix;
}

/**
 * 单词首字母大写
 * @param srcStr : string
 *
 * capitalize();          // => ''
 * capitalize('');        // => ''
 * capitalize(undefined); // => ''
 * capitalize('hello');   // => 'Hello'
 * capitalize(null);      // => 'Null'
 * capitalize(true);      // => 'True'
 * capitalize(false);     // => 'False'
 */
function capitalize(word) {
  return String(word || '').replace(/^[a-z]/, function (letter) {
    return letter.toUpperCase();
  });
}

/**
 * 超出限定数值显示加号
 * @param {number} value 传入数值
 * @param {number} maxNum 限定数值，默认: 99
 * @returns {string}
 *
 * @example
 * outOfNumShowPlus(10);     // => '10'
 * outOfNumShowPlus(10, 9);  // => '9+'
 * outOfNumShowPlus(100);    // => '99+'
 */
function outOfNumShowPlus(value, maxNum) {
  value = isNum(+String(value)) ? value : '';
  if (!isNum(maxNum)) maxNum = 99;
  return value > maxNum ? "".concat(maxNum, "+") : String(value);
}

/**
 * 去除正则首尾限定符
 * @param {RegExp} ptn
 * @returns {string}
 */
function trimReLimits(ptn) {
  return ptn.source.replace(/^\^|\$$/g, '');
}

/**
 * 倒计时类，可用来创建倒计时对象
 * @param {number} time 倒计时时间
 * @param {Object} options 倒计时参数
 * @param {Function} tickCallback 倒计时步进回调
 *
 * @example
 * import { CountDown } from '@blabla/b-utils';
 *
 * 1. 创建并自动开启一个24小时的倒计时
 * new CountDown(864e5, cd => console.log(cd.hhmmss));
 *
 * 2. 创建并自动开启一个60s的倒计时
 * new CountDown(10000, { cdType: 's' }, cd => console.log(cd.s));
 *
 * 3. 创建一个可以显示毫秒的定时器
 * new CountDown(10000, { interval: 50 }, ({ss, SSS}) => {
 *   console.log(`${ss} ${SSS}`);
 * });
 *
 * 4. 创建一个60s倒计时，手动开始和结束
 * const cd = new CountDown(60000, { autoStart: false }, () => {
 *   console.log(cd);
 * });
 * // A moment later
 * cd.start();
 *
 * 5. 创建一个倒计时，自定义参数再启动
 * const cd = new CountDown();
 * cd.time = 10000;
 * cd.cdType = 's';
 * cd.onTick = cd => console.log(cd);
 * cd.start();
 * // A moment later
 * cd.stop();
 * // A moment later
 * cd.start();
 * // Destory The countdown
 * cd.destory();
 */
function CountDown(time, options, tickCallback) {
  var _this3 = this;
  if (isFun(time)) {
    tickCallback = time;
  } else if (isFun(options)) {
    tickCallback = options;
  }
  options = isObj(options) ? options : {};
  this.options = options;
  // 初始时间
  this.initTime = isNum(time) ? time : null;
  // 剩余时间
  this.restTime = this.time;
  // 定时间隔
  this.interval = isNum(options.interval) ? options.interval : 1000;
  // 是否自动启动倒计时
  this.autoStart = options.autoStart !== false;
  // 倒计时类型，d: 到天，h: 到小时，m: 到分钟，s: 到秒，S: 到毫秒，默认：'h'.
  this.cdType = ['d', 'h', 'm', 's', 'S'].indexOf(options.cdType) > -1 ? options.cdType : 'h';
  this.running = false;
  this.destoryed = false;
  this.completed = false;
  this.tickTimes = 0;
  this.restDays = null;
  this.restHours = null;
  this.restMinuts = null;
  this.restSeconds = null;
  this.restMillisecond = null;
  this.d = null;
  this.h = null;
  this.m = null;
  this.s = null;
  this.S = null;
  this.dd = '--';
  this.hh = '--';
  this.mm = '--';
  this.ss = '--';
  this.SSS = '---';
  this.ms = '-:-';
  this.hms = '-:-:-';
  this.mmss = '--:--';
  this.hhmmss = '--:--:--';
  this.timerId = null;

  /**
   * 开始倒计时
   */
  this.start = function () {
    var _this = this;
    if (this.destoryed) return;
    this.running = true;
    if (this.interval >= 0 && this.restTime >= this.interval) {
      this.completed = false;
      clearInterval(this.timerId);
      this.timerId = setInterval(function () {
        return _this.tick();
      }, this.interval);
    } else {
      this.setComplete();
    }
  };

  /**
   * 暂停倒计时
   */
  this.stop = function () {
    clearInterval(this.timerId);
    this.running = false;
  };

  /**
   * 销毁倒计时
   */
  this.destory = function () {
    clearInterval(this.timerId);
    this.running = false;
    this.destoryed = true;
  };

  /**
   * 定时器结束
   */
  this.setComplete = function () {
    clearInterval(this.timerId);
    this.running = false;
    this.completed = true;
  };

  /**
   * 定时步进
   */
  this.tick = function () {
    this.tickTimes++;
    if (this.restTime > this.interval) {
      this.restTime -= this.interval;
      this.setValue();
    } else {
      this.restTime = 0;
      this.setValue();
      this.setComplete();
    }
    if (isFun(this.onTick)) this.onTick(this);
    if (isFun(tickCallback)) tickCallback(this);
  };

  /**
   * 设置定时器的值
   */
  this.setValue = function () {
    var _this2 = this;
    if (!this.restTime || this.restTime < 0) this.restTime = 0;
    this.restDays = Math.floor(this.restTime / 864e5);
    this.restHours = Math.floor(this.restTime / 36e5);
    this.restMinuts = Math.floor(this.restTime / 6e4);
    this.restSeconds = Math.floor(this.restTime / 1000);
    this.restMillisecond = this.restTime;
    if (this.cdType === 'd') {
      var restSeconds = Math.floor(this.restTime % 864e5 / 1000);
      this.d = this.restDays;
      this.h = Math.floor(restSeconds / 3600);
      this.m = Math.floor(restSeconds % 3600 / 60);
      this.s = Math.floor(restSeconds % 60);
    } else if (this.cdType === 'h') {
      this.d = 0;
      this.h = this.restHours;
      this.m = Math.floor(this.restSeconds % 3600 / 60);
      this.s = Math.floor(this.restSeconds % 60);
    } else if (this.cdType === 'm') {
      this.d = this.h = 0;
      this.m = this.restMinuts;
      this.s = Math.floor(this.restSeconds % 60);
    } else if (this.cdType === 's') {
      this.d = this.h = this.m = 0;
      this.s = this.restSeconds;
    } else if (this.cdType === 'S') {
      this.d = this.h = this.m = this.s = 0;
      this.S = this.restMillisecond;
    }
    if (this.cdType !== 'S') {
      this.S = Math.floor(this.restTime % 1000);
    }
    var dhmsS = 'dhmsS';
    dhmsS.substr(dhmsS.indexOf(this.cdType)).split('').forEach(function (item) {
      var itemStr = String(_this2[item]);
      var itemLen = 2,
        itemTpl = item + item;
      if (item === 'S') {
        itemLen++;
        itemTpl += item;
      }
      _this2[itemTpl] = itemStr.length < itemLen ? ('00' + itemStr).substr(-itemLen) : itemStr;
    });
    var co = ':';
    this.ms = this.m + co + this.s;
    this.hms = this.h + co + this.m + co + this.s;
    this.mmss = this.mm + co + this.ss;
    this.hhmmss = this.hh + co + this.mm + co + this.ss;
    ['dd', 'hh', 'mm', 'ss', 'ms', 'hms', 'mmss', 'hhmmss'].forEach(function (item) {
      _this2[item] = _this2[item].replace(/-/g, '0');
    });
  };

  /**
   * 判断是否自动开启
   */
  if (isNum(this.time)) {
    this.setValue();
    if (this.autoStart) {
      setTimeout(function () {
        return _this3.start();
      });
    }
  }
}

/**
 * 手动设置开始时间
 */
Object.defineProperty(CountDown.prototype, 'time', {
  get: function get() {
    return this.initTime;
  },
  set: function set(val) {
    if (isNum(val)) {
      this.initTime = val;
      this.restTime = val;
    }
  }
});

/**
 * 格式化时间参数为日期对象
 * @param {Date|number|string} time
 * @returns {Date}
 *
 * formatToDate(new Date);      // => Date
 * formatToDate('2021-10');     // => Date
 * formatToDate(1636222480480); // => Date
 */
function formatToDate(time) {
  var date = time instanceof Date ? time : new Date(time);
  var dateTime = date.getTime();
  if (!dateTime && dateTime !== 0) return null;
  return date;
}

/**
 * 格式化时间为给定格式
 * @param {string} fmtStr 格式化字符串
 * 如：'YYYY-MM-DD hh:mm:ss'
 * 'YYYY-MM-DD hh:mm:ss'
 * 'YYYY年MM月DD日 hh时mm分'
 * 'hh:mm YYYY/MM/DD'
 * @param {Date | number | string} time 时间
 * @returns {string}
 *
 * formatDate('YYYY-MM-DD hh:mm:ss', Date.now());
 */
function formatDate(fmtStr, time) {
  var date = formatToDate(time);
  if (!date) return '';
  var timeObj = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    S: date.getMilliseconds(),
    Q: Math.floor((date.getMonth() + 3) / 3)
  };
  var formated = fmtStr;
  Object.keys(timeObj).forEach(function (k) {
    if (new RegExp("(".concat(k, ")")).test(formated)) {
      if (k === 'Y+') {
        formated = formated.replace(RegExp.$1, String(timeObj['Y+']).substr(4 - RegExp.$1.length));
      } else {
        var tmk = timeObj[k];
        var fmt = RegExp.$1.length === 1 ? tmk : "00".concat(tmk).substr(String(tmk).length);
        formated = formated.replace(RegExp.$1, fmt);
      }
    }
  });
  return formated;
}

/**
 * 把时间段转化为时分秒(hh:mm:ss)格式
 * @param {string} format 格式化字符串
 * @param {number} duration 时长，毫秒灵敏
 *
 * // 取两位，分、秒
 * formatDuration('mm:ss', 138000);               // => '02:18'
 * formatDuration('mm:ss', 13325000);             // => '222:05'
 * // 取两位，时、分、秒
 * formatDuration('hh:mm:ss', 13325000);          // => '03:42:05'
 * // 自适应，分、秒
 * formatDuration('m:s', 138000);                 // => '2:18'
 * // 自适应，时、分、秒
 * formatDuration('h:m:s', 162325000);            // => '45:5:25'
 * // 小时部分有则显示
 * formatDuration('(hh:)?mm:ss', 3325000);        // => '55:25'
 * formatDuration('(hh:)?mm:ss', 13325000);       // => '03:42:05'
 * // 其它单位
 * formatDuration('hh 时 mm 分 ss 秒', 16335000);  // => '04 时 32 分 15 秒'
 */
function formatDuration(format, duration) {
  if (!format || !/[hms]/.test(format)) return '';
  if (!duration || duration < 0) duration = 0;
  var hours = Math.floor(duration / 36e5);
  var minuts = Math.floor(duration / 6e4);
  var seconds = Math.floor(duration / 1000);
  var o = {
    h: '',
    m: '',
    s: '',
    hh: '',
    mm: '',
    ss: ''
  };
  if (format.match(/h/)) {
    o.h = hours;
    o.m = Math.floor(seconds % 3600 / 60);
    o.s = Math.floor(seconds % 60);
  } else {
    o.h = 0;
    o.m = minuts;
    o.s = Math.floor(seconds % 60);
  }
  var resut = format.replace(/\(([^)]*hh?[^)]*)\)\?/, function (_, $1) {
    return o.h ? $1 : '';
  });
  ['h', 'm', 's'].forEach(function (x) {
    o[x + x] = o[x] < 10 ? '0' + o[x] : o[x];
    resut = resut.replace(new RegExp(x + '{2,}', 'g'), o[x + x]).replace(new RegExp(x, 'g'), o[x]);
  });
  return resut;
}

/**
 * 获取一天的开始时间，00点00分00秒时间戳
 * @param {Date|number|string} time
 * @returns {number}
 *
 * getDayStartTime('2021-10-01'); // => 1633017600000
 */
function getDayStartTime(time) {
  if (isUdf(time)) time = new Date();
  var date = formatToDate(time);
  if (!date) return NaN;
  return date.setHours(0, 0, 0, 0);
}

/**
 * 获取事件发生到现在的可读时间
 * @param {number} time 事件发生时时间戳
 * @param {{
 *   justNow: string;
 *   minutesAgo: string;
 *   hoursAgo: string;
 *   yesterday : string;
 *   future: string;
 * }} timeNames
 * @returns
 * 1分钟以内       => 刚刚
 * [1分钟,60分钟） => n分钟前（例:8分钟前）
 * [1小时,24小时） => n小时前（例: 8小时前）
 * 其他           => 年-月-日（例: 2016-08-05）
 */
function formatTime(time, timeNames) {
  var date = formatToDate(time);
  if (!date) return '';
  if (!timeNames) timeNames = {};
  var justNow = timeNames.justNow || '刚刚';
  var minutesAgo = timeNames.minutesAgo || '分钟前';
  var hoursAgo = timeNames.hoursAgo || '小时前';
  var yesterday = timeNames.yesterday || '昨天';
  var future = timeNames.future || '';
  var now = Date.now();
  time = date.valueOf();
  if (now < time) return future;
  if (now - time <= 6e4) return justNow;
  if (now - time < 36e5) {
    return Math.floor((now - time) / 6e4) + minutesAgo;
  }
  if (now - time < 864e5) {
    return Math.floor((now - time) / 36e5) + hoursAgo;
  }
  if (getDayStartTime(new Date()) - time < 864e5) {
    return yesterday;
  }
  var y = date.getFullYear();
  var m = "0".concat(date.getMonth() + 1).substr(-2);
  var d = "0".concat(date.getDate()).substr(-2);
  if (y === new Date().getFullYear()) {
    return "".concat(m, "-").concat(d);
  }
  return "".concat(y, "-").concat(m, "-").concat(d);
}

/**
 * 根据出生时间获取生日
 * @param {Date|number|string} time
 * @returns {number}
 *
 * // 执行时间：2021-11
 * getAgeByBirth(new Date());   // => 0
 * getAgeByBirth('2011-01-01'); // => 10
 * getAgeByBirth(820454400000); // => 25
 */
function getAgeByBirth(time) {
  var age = -1;
  var birthDate = formatToDate(time);
  if (!birthDate) return age;
  var nowDate = new Date();
  var nowMonth = nowDate.getMonth();
  var birthMonth = birthDate.getMonth();
  age = nowDate.getFullYear() - birthDate.getFullYear();
  if (nowMonth < birthMonth || nowMonth === birthMonth && nowDate.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
}

/**
 * 根据身份证号获取年龄
 * @param {string} cardNb 身份证号码
 *
 * getAgeByIdCard('350424870506202');    // => 34
 * getAgeByIdCard('36232119980910337x'); // => 23
 * getAgeByIdCard('440102198001021230'); // => 41
 */
function getAgeByIdCard(cardNb) {
  cardNb = String(cardNb);
  if (!cardNb || !RE_ID_CARD.test(cardNb)) {
    return -1;
  }
  var birthdayStr = '';
  if (cardNb.length === 15) {
    birthdayStr = "19".concat(cardNb.substr(6, 2), "/").concat(cardNb.substr(8, 2), "/").concat(cardNb.substr(10, 2));
  } else if (cardNb.length === 18) {
    birthdayStr = "".concat(cardNb.substr(6, 4), "/").concat(cardNb.substr(10, 2), "/").concat(cardNb.substr(12, 2));
  }
  return getAgeByBirth(birthdayStr);
}

/**
 * 获取一天的结束时间，23点59分59秒时间戳
 * @param {Date|number|string} time
 * @returns {number}
 *
 * getDayEndTime('2021-10-01'); // => 1633103999999
 */
function getDayEndTime(time) {
  if (isUdf(time)) time = new Date();
  var startTime = getDayStartTime(time);
  if (!startTime) return NaN;
  return startTime + DAY_TIME_1;
}

/**
 * 获取某年某月的天数
 * @param {*} time
 * @returns {number}
 *
 * getMonthDays('2021-2');            // => 28
 * getMonthDays('2021-03');           // => 31
 * getMonthDays(1617235200000);       // => 30
 * getMonthDays(new Date('2021-05')); // => 31
 */
function getMonthDays(time) {
  if (isUdf(time)) time = new Date();
  var date = formatToDate(time);
  if (!date) return NaN;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

/**
 * 获取给定时间的日期在当年的第几天
 * @param {Date|number|string} time
 * @returns {number}
 *
 * @example
 * getDayOfYear();             // => 返回当前日期在一年中的天数
 * getDayOfYear('2021-10-01'); // => 274
 */
function getDayOfYear(time) {
  if (isUdf(time)) time = new Date();
  var date = formatToDate(time);
  if (!date) return NaN;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var days = date.getDate();
  for (var i = 1; i < month; i++) {
    days += getMonthDays("".concat(year, "-").concat(i));
  }
  return days;
}

/**
 * 获取给定时间的日期在当年的第几个星期
 * @param {Date|number|string} time
 * @returns {number}
 *
 * getWeekOfYear('2021-01-01');  // => 1
 * getWeekOfYear('2021-01-03');  // => 1
 * getWeekOfYear('2021-01-04');  // => 2
 */
function getWeekOfYear(time) {
  if (isUdf(time)) time = new Date();
  var date = formatToDate(time);
  if (!date) return NaN;
  var days = getDayOfYear(date);
  var yearFirstDay = new Date(date.getFullYear(), 0, 1).getDay();
  days += yearFirstDay - 1;
  return Math.ceil(days / 7);
}

/**
 * 获取两个时间之前相差的天数
 * @param {Date|number|string} time1 时间1
 * @param {Date|number|string} time2 时间2，默认当天
 * @returns
 *
 * @example
 * getDaysBetween('2021-01-01', '2021-10-01'); // => 273
 */
function getDaysBetween(time1, time2) {
  if (isUdf(time1)) return NaN;
  var timeStamp1 = getDayStartTime(time1);
  if (Number.isNaN(timeStamp1)) return NaN;
  var timeStamp2 = getDayStartTime(time2);
  if (Number.isNaN(timeStamp2)) return NaN;
  return Math.ceil((timeStamp2 - timeStamp1) / DAY_TIME);
}

/**
 * 判断是否为润年
 * @param {number} year
 * @returns {boolean}
 *
 * 1. 直接判断年份
 * isLeapYear(2012); // => true
 * isLeapYear(2013); // => false
 *
 * 2. 传入一个日期
 * isLeapYear(new Date());
 */
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * 分页参数类，创建一个分页对象
 * @param {number} pn
 * @param {number} ps
 * @returns {
 *   pn: number;
 *   ps: number;
 *   pageNum: number;
 *   pageSize: number;
 *   total: number;
 *   hasMore: boolean
 * }
 *
 * @example
 * import { PageParams } from '@blabla/b-utils';
 *
 * const pageParams = new PageParams(1, 10);
 * // total未赋值时，hasMore为true
 * console.log(pageParams.hasMore); // true;
 *
 * pageParams.pn = 2;
 * pageParams.total = 9;
 * // total赋值后，hasMore将被计算出来
 * console.log(pageParams.hasMore); // false;
 */
function PageParams(pn, ps) {
  this.pn = isNum(pn) ? pn : 1;
  this.ps = isNum(ps) ? ps : 10;
  this._total = 0;
  this._hasMore = true;
  this._totalInited = false;
}
Object.defineProperties(PageParams.prototype, {
  pageNum: {
    get: function get() {
      return this.pn;
    },
    set: function set(val) {
      this.pn = val;
    }
  },
  pageSize: {
    get: function get() {
      return this.ps;
    },
    set: function set(val) {
      this.ps = val;
    }
  },

  /**
   * 设置total
   */
  total: {
    get: function get() {
      return this._total;
    },
    set: function set(val) {
      this._total = val;
      this._totalInited = true;
    }
  },

  /**
   * 根据total、pn、ps计算是否还有更多数据
   */
  hasMore: {
    get: function get() {
      return this._hasMore && (!this._totalInited || this.total > this.ps * (this.pn - 1));
    },
    set: function set(val) {
      this._hasMore = val;
    }
  }
});

/**
 * 获取Cookie数据
 * @param {string|true} key Cookie的Key，为true时将返回所有Cookie
 * @param {{ decode?: boolean, template?: string }} options? 可选
 *
 * getCookie(true);         // => { ...cookies }
 * getCookie('cookie_key'); // => *
 */
function getCookie(key, options) {
  if (!options) options = {};
  var isNoDecode = options.decode === false;
  var template = options.template || document.cookie;
  var decodedCookie = isNoDecode ? template : decodeURIComponent(template);
  var cookieItems = {};
  var cookies = decodedCookie.split(';');
  var isGetAll = key === true;
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    var keyVal = cookie.split('=');
    var name = keyVal[0];
    var value = keyVal[1];
    cookieItems[name] = value;
    if (key === name) return cookieItems[key];
  }
  return isGetAll ? cookieItems : '';
}

/**
 * 创建一个基于axios的http请求实例
 *
 * 注意：此方法依赖`axios`包，使用前请确保项目中已经安装该依赖
 * 如果还未安装，可以运行`npm install axios --save`进行安装
 *
 * @param axios axios对象
 * @param options 创建参数
 * @returns {Promise<any>}
 *
 * @example
 * import axios from 'axios';
 *
 * const http = createHttp(axios);
 * const {resToArr, resToObj} = http;
 *
 * // Get请求，格式化结果为数组
 * const querySomeArrayData = () => {
 *   return http.get('https://api.blabla.com/xxx').then(resToArr);
 * }
 * // Post请求，格式化结果为对象
 * const requestSomeObjData = (data) => {
 *   return http.post('https://api.blabla.com/xxx', data).then(resToObj);
 * }
 *
 * // 可以放心解构返回结果，已做空值保护处理
 * querySomeArrayData()
 *   .then(([ firstItem ]) => {
 *     console.log(firstItem);
 *   })
 *   .catch((err) => {
 *     console.error(err)
 *   });
 * requestSomeObjData()
 *   .then(({ objField }) => {
 *     console.log(objField);
 *   })
 *   .catch((err) => {
 *     console.error(err)
 *   });
 *
 * // 单个接口多个成功code: res.code===0 || res.code===200
 * http.get('https://api.blabla.com/xxx', { resOkCodes: [0, 200] }).then(res => {
 *   console.log(res)
 * });
 * // 单个接口不判断res.code===0是成功
 * http.get('https://api.blabla.com/xxx', { handleResCode: false }).then(res => {
 *   console.log(res)
 * });
 */
function createHttp(axios, options) {
  options = options || {};
  var instance = axios.create(options.axiosOptions || {});
  Object.assign(instance.defaults, {
    withCredentials: true
  }, options.defaults);

  // 请求拦截器
  var reqInterceptor = options.reqInterceptor || function (reqConf) {
    return reqConf;
  };

  // 请求失败拦截器
  var reqErrInterceptor = function reqErrInterceptor(err) {
    console.error(err);
    return Promise.reject(err);
  };

  // 响应拦截器
  var resInterceptor = options.resInterceptor || function (res) {
    if (res.config.handleResCode !== false && options.handleResCode !== false) {
      if (!~(res.config.resOkCodes || options.resOkCodes || [0]).indexOf(res.data.code)) {
        return Promise.reject(res.data);
      }
    }
    return res.data;
  };

  // 响应失败拦截器
  var resErrInterceptor = options.resErrInterceptor || function (err) {
    console.error(err);
    return Promise.reject(err);
  };

  // Get处理方法
  var getHandler = options.getHandler || function (http, url, opts) {
    opts = opts || {};
    return http.get(url, opts);
  };

  // Post处理方法
  var postHandler = options.postHandler || function (http, url, data, opts) {
    data = data || {};
    opts = opts || {};
    var formType = 'application/x-www-form-urlencoded';
    var headers = Object.assign({}, {
      'Content-Type': formType
    }, opts.headers);
    if (isFun(opts.getCsrf)) {
      data.csrf = opts.getCsrf();
      delete opts.getCsrf;
    } else if (isFun(options.getCsrf)) {
      data.csrf = options.getCsrf();
    } else {
      data.csrf = getCookie('bili_jct');
    }
    if (headers['Content-Type'] === formType || headers['content-type'] === formType) {
      data = stringifyQueryString(data);
    }
    return http.post(url, data, Object.assign(opts, {
      headers: headers
    }));
  };
  instance.interceptors.request.use(reqInterceptor, reqErrInterceptor);
  instance.interceptors.response.use(resInterceptor, resErrInterceptor);
  return {

    /**
     * Get请求
     */
    get: function get(url, opts) {
      return getHandler(instance, url, opts);
    },

    /**
     * Post请求
     */
    post: function post(url, data, opts) {
      return postHandler(instance, url, data, opts);
    },

    /**
     * Put请求
     */
    put: function put(url, data, opts) {
      data = data || {};
      opts = opts || {};
      return instance.put(url, data, opts);
    },

    /**
     * Delete请求
     */
    "delete": function _delete(url, opts) {
      opts = opts || {};
      return instance["delete"](url, opts);
    },

    /**
     * Patch请求
     */
    patch: function patch(url, data, opts) {
      data = data || {};
      opts = opts || {};
      return instance.patch(url, data, opts);
    },

    /**
     * Request请求
     */
    request: function request(opts) {
      opts = opts || {};
      return instance.request(opts);
    },
    resToData: resToData,
    resToObj: resToObj,
    resToArr: resToArr,
    resToPage: resToPage
  };
}
Object.assign(createHttp, {
  resToData: resToData,
  resToObj: resToObj,
  resToArr: resToArr,
  resToPage: resToPage
});

/**
 * 获取返回结果的data字段
 */
function resToData(res) {
  return res && res.data || null;
}

/**
 * 获取返回结果data字段转对象
 */
function resToObj(res) {
  return res && isObj(res.data) && res.data || {};
}

/**
 * 获取返回结果data字段转数组
 */
function resToArr(res) {
  return res && isArr(res.data) && res.data || {};
}

/**
 * 获取返回结果data字段转分页对象
 */
function resToPage(res) {
  var data = res && isObj(res.data) && res.data || {};
  data.total = data.total || 0;
  data.list = isArr(data.list) && data.list || [];
  return data;
}

/**
 * 强制Url转https协议
 * @param url
 * @returns
 */
function toHttps(url) {
  if (!url) return '';
  var newUrl = url.replace(/^(http:\/\/|:\/\/|\/\/|\/)/, 'https://');
  if (/^https:\/\//.test(newUrl)) {
    return newUrl;
  }
  return url;
}

/**
 * 去除url前面的http或https，由访问地址自动决定
 * @param url
 * @returns
 */
function trimHttp(url) {
  return url.replace(/^https?:/g, '');
}

var _isSupportWebp;

/**
 * 判断是否支持webp
 */
function isSupportWebp() {
  if (_isSupportWebp === undefined) {
    try {
      _isSupportWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') > -1;
    } catch (err) {
      _isSupportWebp = false;
    }
  }
  return _isSupportWebp;
}

/**
 * 格式化图片地址（设置宽、高、缩放、裁剪、webp）
 * @param {*} url
 * @param {*} options.w 宽
 * @param {*} options.h 高
 * @param {*} options.e 优先缩放的边，0：长边优先；1：短边优先； 2：强制缩放，默认为0
 * @param {*} options.c 图片自动裁剪，1表示进行自动裁剪
 * @param {*} options.q 图片清晰度，默认不加，为80%，某些特殊场景如广告需要使用原清晰度则填100
 * @param {*} options.s 该参数只对gif图有效，表示取gif图第一帧
 * @param {*} options.webp 默认支持webp则使用，false则强制不转webp
 *
 * @see https://info.blabla.co/pages/viewpage.action?pageId=59399366
 */
function formatImg(url, options) {
  if (!url || !~url.indexOf('/bfs/')) return url;
  var ret = url.match(/(.*\.(jpg|jpeg|gif|png))(\?.*)?/);
  if (!ret) return url;
  var ext = ret[2];
  var src = ret[1];
  // 图片后参数 比如视频动态图
  var args = ret[3] || '';
  var _Object$assign = Object.assign({}, options || {}),
    _Object$assign$w = _Object$assign.w,
    w = _Object$assign$w === void 0 ? 0 : _Object$assign$w,
    _Object$assign$h = _Object$assign.h,
    h = _Object$assign$h === void 0 ? 0 : _Object$assign$h,
    e = _Object$assign.e,
    _Object$assign$c = _Object$assign.c,
    c = _Object$assign$c === void 0 ? 1 : _Object$assign$c,
    q = _Object$assign.q,
    s = _Object$assign.s,
    _Object$assign$webp = _Object$assign.webp,
    webp = _Object$assign$webp === void 0 ? true : _Object$assign$webp;
  w = Math.abs(Math.round(w));
  h = Math.abs(Math.round(h));
  if (w > 4096 || h > 4096) return url;
  var params = [];
  if (w) params.push("".concat(w, "w"));
  if (h) params.push("".concat(h, "h"));
  if (isNum(e)) params.push("".concat(e, "e"));
  if (isNum(c)) params.push("".concat(c, "c"));
  if (isNum(q)) params.push("".concat(q, "q"));
  if (isNum(s)) params.push('1s');
  var base = "".concat(src, "@").concat(params.join('_'));
  if (w) if (webp && isSupportWebp()) return "".concat(base, ".webp").concat(args);
  return "".concat(base).concat(args ? ".".concat(ext).concat(args) : '');
}

/**
 * 当给定的一组图片全部加载完成
 * @param {Array<string>} imgUrls
 */
function onImagesLoad(imgUrls) {
  var imgs = [];
  return new Promise(function (resolve) {
    var _loop = function _loop() {
      var img = new Image();
      img.src = imgUrls[i];
      img.onload = function () {
        imgs.push(img);
        if (imgs.length === imgUrls.length) {
          resolve(imgs);
        }
      };
    };
    for (var i = 0; i < imgUrls.length; i++) {
      _loop();
    }
  });
}

/**
 * 设置Cookie数据
 * @param {string} key
 * @param {string} value
 * @param {{ exMinuts?: number; exDays?: number; domain?: string; encode?: boolean}} options
 *
 * setCookie('cookie1', 'hello cookie');
 * // 设置blabla.com域下的cookie
 * setCookie('cookie2', 'hello cookie', { domain: '.blabla.com' });
 */
function setCookie(key, value, options) {
  var expires = '',
    exTime = 0;
  options = options || {};
  if (options.encode !== false) {
    value = encodeURIComponent(value);
  }
  if (isNum(options.exMinuts)) {
    exTime += options.exMinuts * 6e4;
  }
  if (isNum(options.exDays)) {
    exTime += options.exDays * DAY_TIME;
  }
  if (exTime) {
    var date = new Date();
    date.setTime(date.getTime() + exTime);
    expires = ";expires=".concat(date.toUTCString());
  }
  var domain = isStr(options.domain) ? ";domain=".concat(options.domain) : '';
  document.cookie = "".concat(key, "=").concat(value).concat(expires, ";path=/").concat(domain);
}

/**
 * 移除Cookie数据
 * @param {string} key
 * @param {string} domain
 *
 * removeCookie('cookieId');
 * // 移除blabla.com域下的cookie
 * removeCookie('cookieId', '.blabla.com');
 */
function removeCookie(key, domain) {
  setCookie(key, '', {
    exDays: -1,
    domain: domain
  });
}

/**
 * 获取缓存数据
 * @param {string} key
 * @returns
 *
 * @example
 * getCache('USER_INFO');
 */
function getCache(key) {
  var caches = window[UTILS_CACHE] || {};
  if (caches.hasOwnProperty(key)) {
    return caches[key];
  }
  return null;
}

/**
 * 设置缓存数据
 * @param {string} key
 * @param {any} value
 * @returns
 */
function setCache(key, value) {
  var caches = window[UTILS_CACHE] || {};
  window[UTILS_CACHE] = caches;
  caches[key] = value;
}

/**
 * 移除缓存数据
 * @param {string} key
 */
function removeCache(key) {
  var caches = window[UTILS_CACHE] || {};
  delete caches[key];
}

/**
 * 获取LocalStorage数据
 * @param {string} key
 * @returns
 */
function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return null;
  }
}

/**
 * 设置LocalStorage数据
 * @param {string} key
 * @param {any} value
 *
 * setLocalStorage('num', 123);
 * setLocalStorage('str', '123');
 * setLocalStorage('arr', []);
 * setLocalStorage('obj', {});
 * console.log(getLocalStorage('num'))  // => 123
 * console.log(getLocalStorage('str'))  // => '123'
 * console.log(getLocalStorage('arr'))  // => []
 * console.log(getLocalStorage('obj'))  // => {}
 */
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_unused) {}
}

/**
 * 移除LocalStorage数据
 * @param {string} key
 * @returns
 */
function removeLocalStorage(key) {
  try {
    return localStorage.removeItem(key);
  } catch (err) {
    return null;
  }
}

/**
 * 获取SessionStorage数据
 * @param {string} key
 * @returns
 */
function getSessionStorage(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (err) {
    return null;
  }
}

/**
 * 设置SessionStorage数据
 * @param {string} key
 * @param {any} value
 *
 * setSessionStorage('num', 123);
 * setSessionStorage('str', '123');
 * setSessionStorage('arr', []);
 * setSessionStorage('obj', {});
 * console.log(getSessionStorage('num'))  // => 123
 * console.log(getSessionStorage('str'))  // => '123'
 * console.log(getSessionStorage('arr'))  // => []
 * console.log(getSessionStorage('obj'))  // => {}
 */
function setSessionStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (_unused) {}
}

/**
 * 移除SessionStorage数据
 * @param {string} key
 * @returns
 */
function removeSessionStorage(key) {
  try {
    return sessionStorage.removeItem(key);
  } catch (err) {
    return null;
  }
}

var _isMobile;

/**
 * 根据UA判断是否为移动端设备
 */
function isMobile() {
  if (_isMobile === undefined) {
    _isMobile = /AppleWebKit.*Mobile.*/i.test(navigator.userAgent);
  }
  return _isMobile;
}

/**
 * 根据UA判断是否为桌面端
 * @returns
 */
function isDesktop() {
  return !isMobile();
}

var _isIos;

/**
 * 根据UA判断是否为iOS系统
 * @returns
 */
function isIos() {
  if (_isIos === undefined) {
    _isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(navigator.userAgent);
  }
  return _isIos;
}

var _isIPhone;

/**
 * 根据UA判断是否为iPhone
 */
function isIPhone() {
  if (_isIPhone === undefined) {
    _isIPhone = /iPhone/i.test(navigator.userAgent);
  }
  return _isIPhone;
}

var _isIPad;

/**
 * 根据UA判断是否为iPad
 */
function isIPad() {
  if (_isIPad === undefined) {
    _isIPad = /iPad/i.test(navigator.userAgent);
  }
  return _isIPad;
}

var _isAndroid;

/**
 * 根据UA判断是否为Android系统
 * @returns
 */
function isAndroid() {
  if (_isAndroid === undefined) {
    var ua = navigator.userAgent;
    _isAndroid = /Android/i.test(ua) || /Linux/i.test(ua);
  }
  return _isAndroid;
}

var _isInBrowser = false;

/**
 * 判断是否为浏览器环境
 */
function isInBrowser() {
  if (_isInBrowser === false) {
    _isInBrowser = typeof window !== 'undefined';
  }
  return _isInBrowser;
}

var isSSR = (function () {
  return !isInBrowser();
});

var _isZhTw;

/**
 * 判断是用否繁体字显示
 * @returns {boolean}
 */
function isZhTw() {
  if (_isZhTw === undefined) {
    var ua = navigator.userAgent.toLowerCase();
    _isZhTw = /c_locale\/zh(-|_)(hant|tw|mo|hk)/.test(ua);
  }
  return _isZhTw;
}

var _isTouchScreen;

/**
 * 判断是否为触摸屏
 * @returns
 */
function isTouchScreen() {
  if (_isTouchScreen === undefined) {
    _isTouchScreen = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
  }
  return _isTouchScreen;
}

/**
 * 获取当前浏览器信息
 * @returns
 */
function getBrowserInfo() {
  var ua = navigator.userAgent.toLowerCase();
  var browserInfo = {
    isIe: false,
    isEdge: false,
    isFirefox: false,
    isOpera: false,
    isSafari: false,
    isChrome: false,
    other: false,
    version: ''
  };
  var setInfo = function setInfo(bro) {
    browserInfo[bro] = true;
    browserInfo.version = RegExp.$1;
    return browserInfo;
  };
  // IE浏览器
  if (/rv:([\d.]+)\) like gecko/.test(ua)) return setInfo('isIe');
  if (/msie ([\d.]+)/.test(ua)) return setInfo('isIe');
  // Edge浏览器
  if (/edge\/([\d.]+)/.test(ua)) return setInfo('isEdge');
  // Firefox浏览器
  if (/firefox\/([\d.]+)/.test(ua)) return setInfo('isFirefox');
  // Opera浏览器
  if (/(?:opera|opr).([\d.]+)/.test(ua)) return setInfo('isOpera');
  // Safari浏览器
  if (/version\/([\d.]+).*safari/.test(ua)) return setInfo('isSafari');
  // Chrome浏览器
  if (/chrome\/([\d.]+)/.test(ua)) return setInfo('isChrome');
  // 其它浏览器
  return setInfo('other');
}

var _platformInfo;

/**
 * 获取浏览器和平台信息
 */
function getPlatformInfo() {
  if (_platformInfo === undefined) {
    var ua = navigator.userAgent;
    _platformInfo = {
      // 是否为移动终端
      isMobile: /AppleWebKit.*Mobile.*/i.test(ua),
      // ios终端
      isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua),
      // android终端或者uc浏览器
      isAndroid: /Android/i.test(ua) || /Linux/i.test(ua),
      // 是否iPad
      isIPad: /iPad/i.test(ua),
      // 是否为iPhone或者QQHD浏览器
      isIPhone: /iPhone/i.test(ua),
      // Windows Phone
      isWindowsPhone: /Windows Phone/i.test(ua),
      // IE内核
      isTrident: /Trident/i.test(ua),
      // opera内核
      isPresto: /Presto/i.test(ua),
      // 苹果、谷歌内核
      isWebKit: /AppleWebKit/i.test(ua),
      // 火狐内核
      isGecko: /Gecko/i.test(ua) && !/KHTML/i.test(ua),
      // 是否为微信
      isMicroMessenger: /MicroMessenger/i.test(ua),
      // 是否web应该程序，没有头部与底部
      isWebApp: !/Safari/i.test(ua),
      // 微博浏览器
      isWeibo: /Weibo/i.test(ua),
      // UC浏览器
      isUC: /UCBrowser/i.test(ua),
      // QQ浏览器
      isQQ: /MQQBrowser/i.test(ua),
      // 百度浏览器
      isBaidu: /Baidu/i.test(ua),
      // IE浏览器
      isIE: /compatible/i.test(ua) && /msie/i.test(ua),
      // IE11浏览器
      isIE11: !!window.ActiveXObject,
      // 火狐浏览器
      isFirefox: /Firefox/.test(ua),
      // 欧朋浏览器
      isOpera: /Opera/.test(ua) && /OPR/.test(ua),
      // Edge浏览器
      isEdge: /Edge/.test(ua),
      // Chrome浏览器
      isChrome: /Chrome/.test(ua),
      // Safari浏览器
      isSafari: /Safari/.test(ua) && !/Chrome/.test(ua)
    };
  }
  return _platformInfo;
}

/**
 * 获取页面性能数据
 * @returns
 */
function getPerformanceInfo() {
  var t = window.performance.timing;
  var m = window.performance.memory;
  return {
    dnsTime: t.domainLookupEnd - t.domainLookupStart,
    tcpTime: t.connectEnd - t.connectStart,
    reqTime: t.responseEnd - t.responseStart,
    domTime: t.domComplete - t.domInteractive,
    whiteTime: t.responseStart - t.navigationStart,
    domreadyTime: t.domContentLoadedEventEnd - t.navigationStart,
    onloadTime: t.loadEventEnd - t.navigationStart,
    jsHeapRatio: m ? Number.parseFloat((m.usedJSHeapSize / m.totalJSHeapSize * 100).toFixed(2)) : NaN
  };
}

/**
 * 彻底移除DOM元素防止内存泄漏
 * @param element {Node}
 */
function removeElement(element) {
  var dustbinId = '__utils_element_dustbin';
  var dustbin = document.getElementById(dustbinId);
  if (!dustbin) {
    dustbin = document.createElement('DIV');
    dustbin.id = dustbinId;
    dustbin.style.display = 'none';
    document.body.appendChild(dustbin);
  }
  dustbin.appendChild(element);
  dustbin.innerHTML = '';
}

/**
 * 复制文本到粘帖板
 * @param {string} text
 * @param {Element} target
 */
function copyText(text, target) {
  var el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  var targetEl = target || document.body;
  targetEl.appendChild(el);
  var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  targetEl.removeChild(el);
  removeElement(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

/* eslint-disable import/prefer-default-export */

/**
 * 处理脚本缓存
 * @param {string} cacheId
 * @param {boolean} reload
 * @param {boolean} isStyle
 */
function cachedStyleOrScript(cacheId, reload, isStyle) {
  return new Promise(function (resolve) {
    reload = reload !== false;
    var cacheKey = isStyle ? CACHED_STYLES : CACHED_SCRIPTS;
    var caches = getCache(cacheKey) || [];
    if (!reload && caches.indexOf(cacheId) > -1) {
      return resolve(true);
    }
    var el = document.querySelector("#".concat(cacheId));
    if (el) el.parentNode.removeChild(el);
    caches = caches.filter(function (item) {
      return item !== cacheId;
    });
    caches.push(cacheId);
    setCache(cacheKey, caches);
    return resolve(false);
  });
}
/* eslint-enable import/prefer-default-export */

/**
 * 动态加载js脚本文件
 * @param {string} src
 * @param {boolean} reload
 *
 * @example
 * loadScript('https://s1.hdslb.com/bfs/static/laputa-home/client/assets/svgfont.6beb9aeb.js');
 */
function loadScript(src, reload) {
  return new Promise(function (resolve, reject) {
    if (!isUrl(src)) return reject(new Error('src不是一个正确的url地址！'));
    var scriptId = "bs_url_".concat(getStringHash(src));
    cachedStyleOrScript(scriptId, reload, false).then(function (cached) {
      if (cached) return resolve();
      var scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'text/JavaScript';
      scriptEl.src = src;
      scriptEl.onload = function () {
        return resolve();
      };
      scriptEl.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          resolve();
        }
      };
      document.querySelector('head').appendChild(scriptEl);
    });
  }).then();
}

/**
 * 动态插入脚本到head中
 * @param {string} script
 * @param {boolean} reload
 *
 * insertScript('console.log("hello b-utils")');
 */
function insertScript(script, reload) {
  return new Promise(function (resolve) {
    script = isStr(script) ? script : '';
    var scriptId = "bs_txt_".concat(getStringHash(script));
    cachedStyleOrScript(scriptId, reload, false).then(function (cached) {
      if (cached) return resolve();
      var scriptEl = document.createElement('script');
      scriptEl.type = 'text/JavaScript';
      scriptEl.id = scriptId;
      try {
        scriptEl.appendChild(document.createTextNode(script));
      } catch (e) {
        scriptEl.text = script;
      }
      document.querySelector('head').appendChild(scriptEl);
      setTimeout(function () {
        return resolve();
      });
    });
  }).then();
}

/**
 * 动态加载css文件
 * @param {string} href
 * @param {boolean} reload
 *
 * @example
 * loadCss('https://s1.hdslb.com/bfs/static/jinkela/long/laputa-css/light.css');
 */
function loadCss(href, reload) {
  return new Promise(function (resolve, reject) {
    if (!isUrl(href)) return reject(new Error('href不是一个正确的url地址！'));
    var styleId = "bs_url_".concat(getStringHash(href));
    cachedStyleOrScript(styleId, reload, true).then(function (cached) {
      if (cached) return resolve();
      var link = document.createElement('link');
      link.id = styleId;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = href;
      document.querySelector('head').appendChild(link);
      setTimeout(function () {
        return resolve();
      });
    });
  }).then();
}

/**
 * 动态插入样式到head中
 * @param {string} css
 * @param {boolean} reload
 *
 * @example
 * insertCss('body { color: blue; }');
 */
function insertCss(css, reload) {
  return new Promise(function (resolve) {
    css = isStr(css) ? css : '';
    var styleId = "bs_txt_".concat(getStringHash(css));
    cachedStyleOrScript(styleId, reload, true).then(function (cached) {
      if (cached) return resolve();
      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        var ieInsertCSS = function ieInsertCSS() {
          style.styleSheet.cssText = css;
          setTimeout(function () {
            return resolve();
          });
        };
        if (style.styleSheet.disable) {
          setTimeout(function () {
            return ieInsertCSS();
          }, 200);
        } else {
          ieInsertCSS();
        }
      } else {
        style.appendChild(document.createTextNode(css));
        document.querySelector('head').appendChild(style);
        setTimeout(function () {
          return resolve();
        });
      }
    });
  }).then();
}

/**
 * 判断是否处于全屏显示状态
 * @returns {boolean}
 */
function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
}

/**
 * 判断是否为HTML元素
 * @param {*} element
 * @returns {boolean}
 */
function isHTMLElement(element) {
  return element instanceof window.HTMLElement;
}

/**
 * 进入全屏显示
 * @param {*} element
 */
function requestFullscreen(element) {
  if (!isHTMLElement(element)) element = document.documentElement;
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (window.ActiveXObject) {
    // eslint-disable-next-line
    new ActiveXObject('WScript.Shell').SendKeys('{F11}');
  }
}

/**
 * 退出全屏显示
 */
function exitFullscreen() {
  var exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (exitMethod) {
    exitMethod.call(document);
  } else if (window.ActiveXObject) {
    // eslint-disable-next-line
    new ActiveXObject('WScript.Shell').SendKeys('{F11}');
  }
}

/**
 * 获取可视区宽高
 * @returns {{clientWidth: number, clientHeight: number}}
 *
 * @example
 * const { clientWidth, clientHeight } = getClientSize();
 */
function getClientSize() {
  var a = 'inner';
  var e = window;
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return {
    clientWidth: e["".concat(a, "Width")],
    clientHeight: e["".concat(a, "Height")]
  };
}

/**
 * 获取页面宽高
 * @returns {{pageWidth: number, pageHeight: number}}
 */
function getPageSize() {
  var _getClientSize = getClientSize(),
    clientWidth = _getClientSize.clientWidth,
    clientHeight = _getClientSize.clientHeight;
  var doc = document;
  var db = doc.body;
  var de = doc.documentElement;
  return {
    pageWidth: Math.max(db.scrollWidth, de.scrollWidth, clientWidth),
    pageHeight: Math.max(db.scrollHeight, de.scrollHeight, clientHeight)
  };
}

/**
 * 获取页面滚动位置
 * @param {HTMLElement} element
 * @returns {{scrollLeft: number, scrollTop: number}}
 */
function getScrollPosition(element) {
  if (isHTMLElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  var de = document.documentElement;
  var db = document.body;
  return {
    scrollLeft: de.scrollLeft || db.scrollLeft,
    scrollTop: de.scrollTop || db.scrollTop
  };
}

/**
 * 获取兼容的动画更新函数
 */
function requestAnimationFrame(callback) {
  return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) {
    setTimeout(cb, 1000 / 60);
  })(callback);
}

/**
 * 滚动到指定位置
 * @param {number} height
 * @param {Object} options
 *
 * // 页面滚动
 * scrollTo(200);
 * // 取消动画
 * scrollTo(500, { animation: false });
 * // 快速动画
 * scrollTo(500, { speed: 3 });
 * // 窗口滚动
 * scrollTo(500, { element: document.querySelector('#container') });
 * // 完成时回调
 * scrollTo(500, { onDone: () => { do sth. } });
 */
function scrollTo(height, options) {
  if (!isNum(height)) {
    if (isFun(options.onDone)) {
      options.onDone();
    }
    return;
  }
  if (height < 0) height = 0;
  options = options || {};
  var element = isHTMLElement(options.element) ? options.element : null;
  var animation = options.animation !== false;
  var speed = isNum(options.speed) ? options.speed : 6;
  if (animation) {
    var scrollTop;
    var offsetHeight;
    var scrollHeight;
    if (element) {
      scrollTop = element.scrollTop;
      offsetHeight = element.offsetHeight;
      scrollHeight = element.scrollHeight;
    } else {
      scrollTop = getScrollPosition().scrollTop;
      offsetHeight = getClientSize().clientHeight;
      scrollHeight = getPageSize().pageHeight;
    }
    var max = scrollHeight - offsetHeight;
    var h = height > max ? max : height;
    var diff = Math.abs(scrollTop - h);
    var step = diff > 1 ? Math.ceil(diff / speed) : diff;
    var to = scrollTop > h ? scrollTop - step : scrollTop + step;
    (element || window).scrollTo(0, to);
    if (diff > 1) {
      requestAnimationFrame(function () {
        return scrollTo(height, options);
      });
    } else {
      if (isFun(options.onDone)) {
        options.onDone();
      }
    }
  } else {
    (element || window).scrollTo(0, height);
    if (isFun(options.onDone)) {
      options.onDone();
    }
  }
}

/**
 * 滚动到页面顶部
 * @param {Object} options
 *
 * scrollToTop();
 * scrollToTop({ animation: false });
 * scrollToTop({ element: document.querySelector('#container') });
 */
function scrollToTop(options) {
  return scrollTo(0, options);
}

/**
 * 滚动到页面底部
 * @param {Object} options
 *
 * scrollToBottom();
 * scrollToBottom({ animation: false });
 * scrollToBottom({ element: document.querySelector('#container') });
 */
function scrollToBottom(options) {
  options = options || {};
  var element = isHTMLElement(options.element) ? options.element : null;
  var scrollHeight = element ? element.scrollHeight : getPageSize().pageHeight;
  scrollTo(scrollHeight, options);
}

/**
 * 获取视频的宽高比
 * @param {*} videoFile 视频文件
 */
function getVideoSizeRatio(videoFile) {
  var url = URL.createObjectURL(videoFile);
  var video = document.createElement('video');
  video.src = url;
  video.onloadedmetadata = function () {
    URL.revokeObjectURL(url);
    return (video.videoWidth / video.videoHeight).toFixed(4);
  };
  video.load();
}

/**
 * 把页面加入浏览器收藏夹
 * @param {string} url
 * @param {string} title
 * @returns
 */
function setToFavorite(url, title) {
  if (isUdf(url)) url = window.location.href;
  if (isUdf(title)) title = document.title;
  try {
    window.external.addFavorite(url, title);
  } catch (err) {
    try {
      window.sidebar.addPanel(title, url, '');
    } catch (e) {
      console.error('加入收藏失败，请使用Ctrl+D进行添加');
      return null;
    }
  }
}

/**
 * 获取拓展屏相对主屏的位置
 * @returns {{screenLeft: number, screenTop: number}}
 *
 * @example
 * const {screenLeft, screenTop} = getScreenPosition();
 */
function getScreenPosition() {
  return {
    screenLeft: window.screenLeft || window.screenX || 0,
    screenTop: window.screenTop || window.screenY || 0
  };
}

/**
 * 打开一个相对屏幕居中的新窗口
 * @param {*} url
 * @param {*} options
 *
 * @example
 * openWindow('https://www.blabla.com', '吧啦吧啦', 1200, 760);
 */
function openWindow(url, options) {
  options = options || {};
  var _options = options,
    left = _options.left,
    top = _options.top,
    width = _options.width,
    height = _options.height,
    windowName = _options.windowName;
  if (!windowName) windowName = 'window';
  if (!isNum(width)) width = 800;
  if (!isNum(height)) height = 520;
  var ua = navigator.userAgent;
  var sW = window.screen.width;
  var sH = window.screen.height;
  var _getScreenPosition = getScreenPosition(),
    screenLeft = _getScreenPosition.screenLeft,
    screenTop = _getScreenPosition.screenTop;
  var isIE = /compatible/i.test(ua) && /msie/i.test(ua);
  if (!isNum(left)) left = sW > width ? (sW - width) / 2 : 0;
  if (!isNum(top)) top = sH > height ? (sH - height) / 2 : 0;
  left += screenLeft;
  top += screenTop;
  if (isIE) {
    var props = "resizable=1,scrollbars=no,location=no,width=".concat(width, ",height=").concat(height, ",left=").concat(left, ",top=").concat(top);
    window.open(url, windowName, props);
  } else {
    var _props = "resizable=yes,dialog=yes,modal=yes,scrollbars=yes,width=".concat(width, ",height=").concat(height, ",left=").concat(left, ",top=").concat(top);
    var win = window.open(url, 'ZyiisPopup', _props);
    // eslint-disable-next-line no-eval
    eval('try { win.resizeTo(width, height); } catch(e) {}');
    win.focus();
  }
}

/**
 * 监听窗口变化，H5判断软键盘是否打开
 * @param {Function} callback
 * @param {boolean} immediate
 * @returns
 *
 * 结合offWindowResize()方法一起使用
 * // 开启监听
 * const windowResizeHandler = onWindowResize(({isUp, isDown}) => {
 *   console.log(isUp, isDown);
 * });
 *
 * // 关闭监听
 * windowResizeHandler.off()
 * // or
 * offWindowResize(windowResizeHandler);
 */
function onWindowResize(callback, immediate) {
  var _getClientSize = getClientSize(),
    originWidth = _getClientSize.clientWidth,
    originHeight = _getClientSize.clientHeight;
  var prevWidth = originWidth;
  var prevHeight = originHeight;
  var resizeHandler = function resizeHandler() {
    var _getClientSize2 = getClientSize(),
      clientWidth = _getClientSize2.clientWidth,
      clientHeight = _getClientSize2.clientHeight;
    var resizeInfo = {
      isUp: clientHeight < prevHeight,
      isDown: clientHeight > prevHeight,
      isShowKeyboard: clientHeight < originHeight - 10,
      width: clientWidth,
      height: clientHeight,
      prevWidth: prevWidth,
      prevHeight: prevHeight,
      originWidth: originWidth,
      originHeight: originHeight
    };
    prevWidth = clientWidth;
    prevHeight = clientHeight;
    if (isFun(callback)) callback(resizeInfo);
  };
  if (immediate) resizeHandler();
  window.addEventListener('resize', resizeHandler);
  resizeHandler.off = function () {
    window.removeEventListener('resize', resizeHandler);
  };
  return resizeHandler;
}

/**
 * 取消监听窗口变化
 * @param {*} handler
 *
 * 结合onWindowResize()方法一起使用
 * // 开启监听
 * const handler = onWindowResize(({isUp, isDown}) => {
 *   console.log(isUp, isDown);
 * });
 *
 * // 关闭监听
 * offWindowResize(handler);
 */
function offWindowResize(handler) {
  window.removeEventListener('resize', handler);
}

/**
 * 触发一个自定义事件
 * @param {*} eName  自定义事件名称
 * @param {*} detail 自定义事件参数
 * @param {*} target 自定义事件元素，默认windows
 *
 * const logEventDetail = e => console.log(e.detail);
 *
 * window.addEventListener('hello', logEventDetail);
 * dispatchCustomEvent('hello', '哈啰'); // => 哈啰
 *
 * window.removeEventListener('hello', logEventDetail);
 * dispatchCustomEvent('hello', '哈啰'); // => 无打印
 */
function dispatchCustomEvent(eName, detail, target) {
  if (target === undefined) target = window;
  return target.dispatchEvent(new CustomEvent(eName, {
    detail: detail
  }));
}

/**
 * 判断元素是否与选择器匹配
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Boolean}
 * @api public
 *
 * source by `dom-matches`
 * https://github.com/necolas/dom-matches.git
 */
function isElementMatch(element, selector) {
  // Vendor-specific implementations of `Element.prototype.matches()`.
  var proto = window.Element.prototype;
  var nativeMatches = proto.matches || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
  if (!element || element.nodeType !== 1) {
    return false;
  }
  var parentElem = element.parentNode;

  // use native 'matches'
  if (nativeMatches) {
    return nativeMatches.call(element, selector);
  }

  // native support for `matches` is missing and a fallback is required
  var nodes = parentElem.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] === element) return true;
  }
  return false;
}

/**
 * 获取离已知元素最近的匹配祖先元素（包括自身）
 * @param element {Element}
 * @param selector {String}
 * @param context {Element=}
 * @return {Element}
 *
 * @alias getMatchedWrapElement
 *
 * source by `dom-closest`
 * https://github.com/necolas/dom-closest.git
 *
 */
function getClosestElement(element, selector, context) {
  context = context || document;
  // guard against orphans
  element = {
    parentNode: element
  };
  while ((element = element.parentNode) && element !== context) {
    if (isElementMatch(element, selector)) {
      return element;
    }
  }
  return null;
}

/**
 * 设置输入框光标位置或定位光标到未尾
 * @param {Element} element 元素
 * @param {number} position 位置，不传默认到未尾
 *
 * @example
 * <input onfocus="setCursorPosition(e.target)" />
 */
function setCursorPosition(element, position) {
  if (isHTMLElement(element) && element.focus) {
    setTimeout(function () {
      if (!isNum(position)) {
        position = (element.value || '').length;
      }
      if (element.setSelectionRange) {
        element.focus();
        element.setSelectionRange(position, position);
      } else if (element.createTextRange) {
        var range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    });
  }
}

/**
 * 判断元素是否有某个class类名
 * @param element HTML元素
 * @param className 类名
 *
 * @example
 * hasClass(someEl, 'hide')
 */
function hasClass(element, className) {
  if (!element || !element.classList) return false;
  return element.classList.contains(className);
}

/**
 * 给元素增加一个class名
 * @param element HTML元素
 * @param className 类名
 *
 * @example
 * addClass(someEl, 'hide')
 */
function addClass(element, className) {
  if (!element || !element.classList) return;
  if (!element.classList.contains(className)) element.classList.add(className);
}

/**
 * 移除元素的某个class类名
 * @param element HTML元素
 * @param className 类名
 *
 * @example
 * removeClass(someEl, 'hide')
 */
function removeClass(element, className) {
  if (!element || !element.classList) return;
  if (element.classList.contains(className)) element.classList.remove(className);
}

/**
 * Base64或dataURI转unit8数组
 * @param {*} base64 Base64或dataURI数据
 * @returns {Uint8Array}
 */
function base64ToUnit8Array(base64) {
  base64 = base64.replace(/^data.*?,/, '');
  var byteString = window.atob(base64);
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var unit8array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
    unit8array[i] = byteString.charCodeAt(i);
  }
  return unit8array;
}

/**
 * Base64或dataURI转Blob对象
 * @param {*} base64 Base64或dataURI数据
 * @param {*} mimeType 文件类型
 * @returns {Blob}
 */
function base64ToBlob(base64, mimeType) {
  mimeType = mimeType || /:(.*?);/.test(base64) && RegExp.$1;
  var unit8array = base64ToUnit8Array(base64);
  return new Blob([unit8array], {
    type: mimeType
  });
}

/**
 * Base64或dataURI转File对象
 * @param {*} base64 Base64或dataURI数据
 * @param {*} fileName 文件名称
 * @param {*} mimeType 文件类型
 * @returns {File}
 */
function base64ToFile(base64, fileName, mimeType) {
  mimeType = mimeType || /:(.*?);/.test(base64) && RegExp.$1;
  var unit8array = base64ToUnit8Array(base64);
  return new File([unit8array], fileName, {
    type: mimeType
  });
}

/**
 * 修复Canvase模糊的问题
 * @param {*} canvas
 * @param {*} context
 * @param {number} width  // canvas实际宽度
 * @param {number} height // canvas实际高度
 */
function canvasVoidBlur(canvas, context, width, height) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = canvas.webkitBackingStorePixelRatio || 1;
  var ratio = devicePixelRatio / backingStoreRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = "".concat(width, "px");
  canvas.style.height = "".concat(height, "px");
  context.scale(ratio, ratio);
}

/**
 * 下载文件到本地，并指定文件名
 * @param {File|Blob|string} source Base64或dataURI数据
 * @param {*} fileName 下载文件名
 */
function downloadFile(source, fileName) {
  if (RE_BASE64.test(source)) {
    source = base64ToBlob(source);
  }
  if (source instanceof Blob) {
    var aLink = document.createElement('a');
    var event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(source);
    aLink.click();
  }
}

/**
 * File或Blob对象转Base64字符串
 * @param {*} fileOrBlob File或Blob对象
 * @returns {Promise<string>}
 */
function fileOrBlobToBase64(fileOrBlob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      return resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(fileOrBlob);
  });
}

/**
 * 图片转Base64字符串
 * @param {*} image
 * @returns
 */
function imageToBase64(image) {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);
  var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL("images/".concat(ext));
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var md5 = createCommonjsModule(function (module) {
(function(){
  var crypt$1 = crypt,
      utf8 = charenc_1.utf8,
      isBuffer = isBuffer_1,
      bin = charenc_1.bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already
    var m = crypt$1.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt$1.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt$1.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt$1.bytesToHex(digestbytes);
  };

})();
});

function getMixinKey(originKey) {
  // prettier-ignore
  var keyRule = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52];
  var mixinKey = [];
  keyRule.forEach(function (i) {
    if (originKey.charAt(i)) {
      mixinKey.push(originKey.charAt(i));
    }
  });
  return mixinKey.join('').slice(0, 32);
}
function getLocal(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function swapString(str, times) {
  if (str.length % 2) return str;
  if (times === 0) return str;
  if (str.length === Math.pow(2, times)) return str.split('').reverse().join();
  var left = str.slice(0, str.length / 2);
  var right = str.slice(str.length / 2);
  return "".concat(swapString(right, times - 1)).concat(swapString(left, times - 1));
}

export { CountDown, PageParams, addClass, array, base64ToBlob, base64ToFile, base64ToUnit8Array, canvasVoidBlur, capitalize, compareVersion, consts, copyText, createHttp, cutString, debounce, unescapeHtml as decodeHtml, deepCopy, dispatchCustomEvent, downloadFile, escapeHtml as encodeHtml, escapeHtml, exitFullscreen, fileOrBlobToBase64, findIndex, flatten, formatDate, formatDate as formatDateTime, formatDuration, formatImg, formatImg as formatImgSrc, formatMoney, formatNum, formatTime as formatPassedTime, formatTime, formatToDate, get, getAgeByBirth, getAgeByIdCard, getBrowserInfo, getCache, getClientSize, getClosestElement, getCookie, getDayEndTime, getDayOfYear, getDayStartTime, getDaysBetween, getLocalStorage, getClosestElement as getMatchedWrapElement, getMonthDays, getPageSize, getPerformanceInfo, getPlatformInfo, getScreenPosition, getScrollPosition, getSessionStorage, getStringHash, getVideoSizeRatio, getWeekOfYear, hasClass, imageToBase64, includes, insertCss, insertScript, isAndroid, isArr, isBase64, isBol, isCnChar, isDbChar, isDeepEqual, isDesktop, isElementMatch, isEmail, isFullscreen, isFun, isHTMLElement, isIPad, isIPhone, isIdCard, isInBrowser, isIos, isIpv4, isLeapYear, isMobile, isNul, isNum, isObj, isPhone, isSSR, isStr, isSupportWebp, isTouchScreen, isUdf, isUdfNul, isUrl, isZhTw, loadCss, loadScript, maskString, offWindowResize, omit, onImagesLoad, onWindowResize, openWindow, outOfNumShowPlus, parseQueryString as parseQs, parseQueryString, pick, pretty, randomColor, randomId, randomNum, removeCache, removeClass, removeCookie, removeElement as removeDomElement, removeElement, removeLocalStorage, removeSessionStorage, requestAnimationFrame, requestFullscreen, scrollTo, scrollToBottom, scrollToTop, setCache, setCookie, setCursorPosition, setLocalStorage, setSessionStorage, setToFavorite, shuffle, stringifyQueryString as stringifyQs, stringifyQueryString, throttle, toArray, toHttps, toRowType, trimHttp, trimReLimits, tulpeArray, unescapeHtml, unique, toHttps as urlToHttps, trimHttp as urlTrimHttp, version };
