var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;
var ProgressBar = require('./lib/ProgressBar');
var ProgressSpi = require('./lib/ProgressSpi');

/**
 * @license
 * Funclib v6.0.5 <https://www.funclib.net>
 * GitHub Repository <https://github.com/CN-Tower/funclib.js>
 * Released under MIT license <https://github.com/CN-Tower/funclib.js/blob/master/LICENSE>
 */
; (function () {

  var version = '6.0.5';
  
  var undefined, UDF = undefined, F = function() {}
    , _global = typeof global == 'object' && global && global.Object === Object && global
    , _self = typeof self == 'object' && self && self.Object === Object && self
    , _exports = typeof exports == 'object' && exports && !exports.nodeType && exports
    , _module = _exports && typeof module == 'object' && module && !module.nodeType && module
    , root = _global || _self || Function('return this')()
    , oldFn = root.fn;
  
  /**
   * HTML encode and decode characters.
   */
  var deCodes = ['&', '<', '>', ' ', '\'', '"']
    , enCodes = ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;'];
  
  /**
   * String match variables.
   */
  var MATCH_SYMBOL='__@fnMatch__'
    , MATCH_NEST = '@next';
  
  /**
   * Frequently-used regular expression patterns.
   */
  var patterns = {
    cnChar: /[\u4e00-\u9fa5]/,
    dbChar: /[^x00-xff]/,
    email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    phone: /(\+?0?86\-?)?1[3456789]\d{9}/,
    telephone: /((\d{3,4})|\d{3,4}-)?\d{7,8}/,
    idCard: /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/,
    uuid: /[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}/,
    base64Code: /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/,
    domain: /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/,
    port: /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/,
    ip: /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/,
    url_: /(\/([^?#]*))?(\?([^#]*))?(#(.*))?/
  };
  patterns['ipUrl'] = new RegExp('http(s)?://' + patterns.ip.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
  patterns['domainUrl'] = new RegExp('http(s)?://' + patterns.domain.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
  patterns['url'] = new RegExp('http(s)?://(' + patterns.ip.source + '|' + patterns.domain.source + ')(:' + patterns.port.source + ')?' + patterns.url_.source);
  
  /**
   * timers container.
   */
  var intervalTimers = {}
    , timeoutTimers  = {};
  
  /**
   * Char sets
   */
  var charNb = '0123456789'
    , charLower = 'abcdefghijklmnopqrstuvwxyz'
    , charUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    , charPwd = '~!@#$%^&*_';/**
   * Color string of console display.
   */
  var colorPre = '\x1B[';
  var colorEnd = colorPre + '0m';
  var colorList = {
    'grey': colorPre + '90m',
    'blue': colorPre + '34m',
    'cyan': colorPre + '36m',
    'green': colorPre + '32m',
    'magenta': colorPre + '35m',
    'red': colorPre + '31m',
    'yellow': colorPre + '33m',
    'default': ''
  };

  /**
   * Funclib definition closure.
   */
  var fn = (function () {

    /**
     * [fn.rest] 获取函数的剩余参数
     * @param func : function
     */
    function rest(func) {
      if (!isFun(func)) throwErr('fun');
      var start = func.length - 1;
      return function () {
        var len = Math.max(arguments.length - start, 0);
        var rst = Array(len), i = -1;
        while (++i < len) rst[i] = arguments[start + i];
        var args = Array(start + 1);
        for (i = 0; i < start; i ++) args[i] = arguments[i];
        args[start] = rst;
        switch (args.length) {
          case 0: return func.call(this);
          case 1: return func.call(this, args[0]);
          case 2: return func.call(this, args[0], args[1]);
          case 3: return func.call(this, args[0], args[1], args[2]);
        }
        return func.apply(this, args);
      };
    }

    /**
     * [fn.typeOf] 检查值的类型
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    var typeOf = rest(function (value, type_, types) {
      if (!type_) return false;
      types = toArr(type_).concat(types);
      return types.some(function (_type) {
        switch (_type) {
          case 'str': return isStr(value);
          case 'num': return isNum(value);
          case 'bol': return isBol(value);
          case 'fun': return isFun(value);
          case 'nul': return isNul(value);
          case 'udf': return isUdf(value);
          case 'err': return isErr(value);
          case 'dat': return isDat(value);
          case 'reg': return isReg(value);
          case 'arr': return isArr(value);
          case 'obj': return isObj(value);
          default: return typeof value === _type;
        }
      });
    });

    /**
     * [fn.typeVal] 获取期望类型的值
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    var typeVal = rest(function (value, type_, types) {
      return typeOf.apply(void 0, [value, type_].concat(types)) && value;
    });

    /**
     * [fn.isStr] 判断类型是否为：string
     * @param value : any
     */
    function isStr(value) {
      return typeof value == 'string';
    }

    /**
     * [fn.isNum] 判断类型是否为：number
     * @param value  : any
     * @param impure : boolean = false
     */
    function isNum(value, impure) {
      var isNb = typeof value == 'number';
      return impure ? isNb : isNb && isFinite(value);
    }

    /**
     * [fn.isBol] 判断类型是否为：boolean
     * @param value : any
     */
    function isBol(value) {
      return typeof value == 'boolean';
    }

    /**
     * [fn.isFun] 判断类型是否为：function
     * @param value : any
     */
    function isFun(value) {
      return typeof value == 'function';
    }

    /**
     * [fn.isNul] 判断是否为：null
     * @param value : any
     */
    function isNul(value) {
      return value === null;
    }

    /**
     * [fn.isUdf] 判断类型是否为：undefined
     * @param value : any
     */
    function isUdf(value) {
      return value === UDF;
    }

    /**
     * [fn.isErr] 判断类型是否为：Error
     * @param value : any
     */
    function isErr(value) {
      return value instanceof Error;
    }

    /**
     * [fn.isDat] 判断类型是否为：Date
     * @param value : any
     */
    function isDat(value) {
      return value instanceof Date;
    }

    /**
     * [fn.isReg] 判断类型是否为：RegExp
     * @param value : any
     */
    function isReg(value) {
      return value instanceof RegExp;
    };

    /**
     * [fn.isArr] 判断类型是否为：Array
     * @param value : any
     */
    function isArr(value) {
      return value instanceof Array;
    }

    /**
     * [fn.isObj] 判断是否为：正常Object
     * @param value : any
     */
    function isObj(value) {
      return !!value && typeof value == 'object'
        && [_global, _self].indexOf(value) == -1
        && [isArr, isFun, isErr, isDat, isReg].every(function(func) { return !func(value); });
    }

    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param value  : any|function [?]
     */
    function array(length, value) {
      var tmpArr = [], tmpVal = 0, i = -1;
      while (++i < length) {
        if (isUdf(value)) {
          tmpArr.push(tmpVal++);
        } else if (isFun(value)) {
          tmpArr.push(value.length > 0 ? value(i) : value());
        } else {
          tmpArr.push(value);
        }
      }
      return tmpArr;
    }

    /**
     * [fn.range] 返回一个范围数组
     * @param start  : number [?]
     * @param length : number
     */
    function range(start, length) {
      var rgArr = [];
      if (isNum(start)) {
        function rangeLoop(isAdd) {
          if (length >= 0) {
            for (var i = 0; i < length; i++) rgArr.push(isAdd ? i + start : i);
          } else if (length < 0) {
            for (var i = 0; i > length; i--) rgArr.push(isAdd ? i + start : i);
          }
        };
        if (isUdf(length)) {
          length = start, start = UDF;
          rangeLoop(false);
        } else if (isNum(length)) {
          rangeLoop(true);
        }
      }
      return rgArr;
    }

    /**
     * [fn.toArr] 值数组化
     * @param value : any
     */
    function toArr(value) {
      return isArr(value) ? value : [value];
    }

    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr    : array|string
     * @param predicate : object|function|any
     */
    function indexOf(srcArr, predicate) {
      for (var i = 0; i < srcArr.length; i++) {
        if (isObj(predicate)) {
          if (keys(predicate).every(
            function (k) { return srcArr[i][k] === predicate[k]; })
          ) return i;
        } else if (isFun(predicate)) {
          if (predicate(srcArr[i])) return i;
        }
      }
      return srcArr.indexOf(predicate);
    }

    /**
     * [fn.find] 根据条件取一个值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function find(srcArr, predicate) {
      var idx = indexOf(srcArr, predicate);
      return idx > -1 ? srcArr[idx] : UDF;
    }

    /**
     * [fn.filter] 根据条件取过滤值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function filter(srcArr, predicate) {
      return filterBase(srcArr, predicate, true);
    }

    /**
      * [fn.reject] 根据条件过滤值
      * @param srcArr    : array
      * @param predicate : object|function|any
      */
      function reject(srcArr, predicate) {
      return filterBase(srcArr, predicate, false);
    }

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    function contains(srcArr, predicate) {
      return indexOf(srcArr, predicate) > -1;
    }

    /**
     * [fn.drop] 去掉空数组、空对象及布尔化后为false的值
     * @param srcArr  : array
     * @param isDrop0 : boolean = false
     */
    function drop(srcArr, isDrop0) {
      var tmpArr = [];
      forEach(srcArr, function (val) {
        var isLen0 = typeOf(val, 'arr', 'obj') && len(val) === 0;
        if ((val && !isLen0) || (!isDrop0 && val === 0)) {
          tmpArr.push(val);
        }
      });
      return tmpArr;
    }

    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr : array
     * @param isDeep : boolean = false
     */
    function flatten(srcArr, isDeep) {
      var tmpArr = [];
      forEach(srcArr, function (val) {
        if (isArr(val)) {
          tmpArr.push.apply(tmpArr, isDeep ? flatten(val, true) : val);
        } else {
          tmpArr.push(val);
        }
      });
      return tmpArr;
    }

    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param srcArr  : array
     * @param pathStr : string
     */
    function pluck(srcArr, pathStr) {
      var tmpArr = [];
      if (typeVal(pathStr, 'str')) {
        forEach(srcArr, function (val) { tmpArr.push(get(val, pathStr)); });
      }
      return tmpArr;
    }

    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr  : array
     * @param pathStr : string [?]
     * @param isDeep  : boolean = true
     */
    function uniq(srcArr, pathStr, isDeep) {
      if (isUdf(isDeep)) isDeep = true;
      if (isBol(pathStr)) isDeep = pathStr, pathStr = UDF;
      pathStr = typeVal(pathStr, 'str');
      var tmpArr = srcArr.slice(), i = -1;
      while (++i < tmpArr.length - 1) {
        for (var j = i + 1; j < tmpArr.length; j++) {
          var isDuplicate;
          if (pathStr) {
            var val1 = get(tmpArr[i], pathStr), val2 = get(tmpArr[j], pathStr);
            isDuplicate = isDeep ? isDeepEqual(val1, val2) : val1 === val2;
          } else {
            isDuplicate = isDeep ? isDeepEqual(tmpArr[i], tmpArr[j]) : tmpArr[i] === tmpArr[j];
          }
          if (isDuplicate) tmpArr.splice(j--, 1);
        }
      }
      return tmpArr;
    }

    /**
     * [fn.forEach] 遍历数组或类数组
     * @alias fn.each
     * @param srcObj   : array|object
     * @param iteratee : function
     */
    function forEach(srcObj, iteratee) {
      if (!srcObj) return srcObj;
      if (!isFun(iteratee)) throwErr('fun');
      var length = srcObj.length;
      if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
        for (var i = 0; i < length; i++) iteratee(srcObj[i], i);
      } else {
        var ks = keys(srcObj), i = -1;
        while (++ i < ks.length) iteratee(srcObj[ks[i]], ks[i]);
      }
      return srcObj;
    }

    /**
     * [fn.sortBy] 返回对象数组根据字段排序后的副本
     * @param srcArr    : array
     * @param fieldPath : string
     * @param isDesc    : boolean = false
     */
    function sortBy(srcArr, fieldPath, isDesc) {
      return srcArr.slice().sort(function (row1, row2) {
        var rst1 = get(row1, fieldPath), rst2 = get(row2, fieldPath);
        if (rst1 !== 0 && !rst1) {
          return isDesc ? 1 : -1;
        } else if (rst2 !== 0 && !rst2) {
          return isDesc ? -1 : 1;
        } else if (rst1 === rst2) {
          return 0;
        } else {
          return (rst1 > rst2) ? (isDesc ? -1 : 1) : (isDesc ? 1 : -1);
        }
      });
    }

    /**
     * [fn.len] 获取对象自有属性的个数
     * @arg srcObj : any
     */
    function len(srcObj) {
      if (isObj(srcObj)) {
        return keys(srcObj).length;
      }
      else if (typeOf(srcObj, 'str', 'arr', 'fun') || (srcObj && srcObj.length)) {
        return srcObj.length;
      }
      else return -1;
    }

    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param srcObj   : object
     * @param property : string
     * @param types    : ...string[]
     */
    var has = rest(function (srcObj, property, types) {
      var isHas = srcObj && srcObj.hasOwnProperty(property);
      return types.length ? isHas && typeOf(srcObj[property], types) : isHas;
    });

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param srcObj  : object
     * @param pathStr : string
     * @param types   : ...string[]
     */
    var get = rest(function (srcObj, pathStr, types) {
      if (!srcObj || !isStr(pathStr)) return UDF;
      var paths = getPaths(pathStr), prop = paths.shift();
      if (!prop) {
        return types.length ? typeVal.apply(void 0, [srcObj].concat(types)) : srcObj;
      }
      if (paths.length) {
        if (!typeVal(srcObj[prop], 'object', 'fun')) return UDF;
        return get.apply(void 0, [srcObj[prop], paths.join('/')].concat(types));
      } else {
        return types.length ? typeVal.apply(void 0, [srcObj[prop]].concat(types)) : srcObj[prop];
      }
    });

    /**
     * [fn.set] 设置对象或子孙对象的属性
     * @param srcObj  : object
     * @param pathStr : string
     * @param value   : any
     */
    function set(srcObj, pathStr, value) {
      function setBase(origin, srcObj, pathStr, value) {
        if (!srcObj || !isStr(pathStr)) return origin;
        var paths = getPaths(pathStr), prop = paths.shift();
        if (!prop) return origin;
        if (paths.length) {
          if (!typeVal(srcObj[prop], 'object', 'fun')) return origin;
          return setBase(origin, srcObj[prop], paths.join('/'), value);
        } else {
          srcObj[prop] = value;
          return origin;
        }
      }
      return setBase(srcObj, srcObj, pathStr, value);
    }

    /**
     * [fn.keys] 获取对象的键数组
     * @param srcObj : object
     */
    function keys(srcObj) {
      return Object.keys(srcObj);
    }

    /**
     * [fn.pick] 获取包含部分属性的对象副本
     * @param srcObj    : object
     * @param predicate : function|string|string[]|{ default?: any }
     * @param props     : ...string[]
     */
    var pick = rest(function (srcObj, predicate, props) {
      return extendBase({}, srcObj, predicate, props);
    });

    /**
     * [fn.omit] 获取省略部分属性的对象副本
     * @param srcObj    : object
     * @param predicate : function|string|string[]
     * @param props     : ...string[]
     */
    var omit = rest(function (srcObj, predicate, props) {
      return extendBase({}, srcObj, predicate, props, true, true);
    });

    /**
     * [fn.extend] 给对象赋值
     * @param tarObj    : object
     * @param srcObj    : object
     * @param predicate : function|string|string[]|{ default?: any }
     * @param props     : ...string[]
     */
    var extend = rest(function (tarObj, srcObj, predicate, props) {
      return extendBase(tarObj, srcObj, predicate, props, true);
    });

    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @arg srcObj   : object
     * @arg iteratee : function
     */
    function forIn(srcObj, iteratee) {
      if (!isFun(iteratee)) throwErr('fun');
      return forEach(srcObj, function (val, key) {
        iteratee(key, val);
      });
    }

    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param srcObj : object
     */
    function deepCopy(srcObj) {
      var objStack = [];
      function copyObj(obj) {
        var tmpObj = obj;
        if (isArr(obj)) {
          tmpObj = [];
          for (var i = 0; i < obj.length; i++) {
            tmpObj.push(copyObj(obj[i]));
          }
        } else if (isObj(obj)) {
          if (objStack.indexOf(obj) > -1) {
            tmpObj = obj.constructor && obj.constructor.name;
          } else {
            objStack.push(obj);
            tmpObj = {};
            for (var key in obj) {
              if (has(obj, key)) tmpObj[key] = copyObj(obj[key]);
            }
          }
        }
        return tmpObj;
      }
      return copyObj(srcObj);
    }

    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param srcObj : object
     */
    function isEmpty(srcObj) { return len(srcObj) === 0; }

    /**
     * [fn.isDeepEqual] 判断数组或对象是否相等
     * @param obj1     : object|array
     * @param obj2     : object|array
     * @param isStrict : boolean = false
     */
    function isDeepEqual(obj1, obj2, isStrict) {
      if (typeof obj1 !== typeof obj2) {
        return false;
      }
      if (isArr(obj1) && isArr(obj2)) {
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; i++) {
          if (!isDeepEqual(obj1[i], obj2[i]), isStrict) {
            return false;
          }
        }
        return true;
      } else if (isObj(obj1) && isObj(obj2)) {
        if (len(obj1) !== len(obj2)) {
          return false;
        }
        var ks = keys(obj1);
        if (isStrict && !isDeepEqual(ks, keys(obj2))) {
          return false;
        }
        for (var i = 0; i < ks.length; i++) {
          if (!has(obj2, ks[i]) || !isDeepEqual(obj1[ks[i]], obj2[ks[i]], isStrict)) {
            return false;
          }
        }
        return true;
      } else {
        return obj1 === obj2;
      }
    }

    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param start : number
     * @param end   : number [?]
     * @param isInt : boolean = true;
     */
    function random(start, end, isInt) {
      if (!isNum(start)) return Math.random();
      if (isBol(end)) isInt = end, end = UDF;
      if (isInt !== false) isInt = true;
      var rdNum, temp;
      if (!isNum(end) || start === end) {
        rdNum = Math.random() * start;
        return isInt ?  Math.floor(rdNum) : rdNum;
      } else {
        var isStartGt = start > end
        if (isStartGt) temp = start, start = end, end = temp;
        rdNum = Math.random() * (end - start) + start;
        return isInt ? (isStartGt ? Math.ceil(rdNum) : Math.floor(rdNum)) : rdNum ;
      }
    }

    /**
     * [fn.randomId] 返回一个指定长度的随机ID
     * @param length : number = 12
     * @param charSet: string?
     * charSet presets: [pwd] | [0-9] | [a-z] | [A-A] | [0-9a-z]... | string.
     */
    function randomId(length, charSet) {
      if (isUdf(length)) length = 12;
      if (!charSet || !isStr(charSet)) {
        charSet = charNb + charUpper;
      } else {
        if (charSet.match(/^\[.*\]$/)) {
          var chars = '';
          if (charSet === '[pwd]') {
            chars = charUpper + charLower + charNb + charPwd;
          } else {
            if (charSet.match(/0-9/)) chars += charNb;
            if (charSet.match(/a-z/)) chars += charLower;
            if (charSet.match(/A-Z/)) chars += charUpper;
          }
          if (chars) charSet = chars;
        }
      }
      var str = '', i = -1;
      while (++i< length) str += charSet[random(charSet.length)];
      return str;
    }

    /**
     * [fn.randomColor] 返回一个随机颜色色值
     */
    function randomColor() {
      return '#' + ('00000' + (random(0x1000000) << 0).toString(16)).slice(-6);
    }

    /**
     * [fn.interval] 循环定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     * @param leading  : boolean [?]
     */
    function interval(timerId, duration, callback, leading) {
      return timerBase(timerId, duration, callback, leading, 'interval');
    }

    /**
     * [fn.timeout] 延时定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     * @param leading  : boolean [?]
     */
    function timeout(timerId, duration, callback, leading) {
      return timerBase(timerId, duration, callback, leading, 'timeout');
    }

    /**
     * [fn.defer] 延迟执行函数
     * @param func : function
     */
    function defer(func) {
      return setTimeout(func);
    }

    /**
     * [fn.timestamp] 返回一个时间戳
     * @param time : date|string|number
     */
    function timestamp(time) {
      return dateBase(time).getTime();
    }

    /**
     * [fn.asUtcTime] 转化为相同时间的UTC时间戳
     * @param time : date|string|number
     */
    function asUtcTime(time) {
      var date = dateBase(time);
      if (!date.getTime()) return NaN;
      var timeObj = getTimeObj(date);
      return Date.UTC(
        timeObj['y+'], timeObj['M+'] - 1, timeObj['d+'],
        timeObj['h+'], timeObj['m+'], timeObj['s+'], timeObj['S']
      );
    }

    /**
     * [fn.asXyzTime] 转化为相同时间的指定时差的时间戳
     * @param time : date|string|number
     * @param offset : number
     */
    function asXyzTime(time, offset) {
      return asUtcTime(time) - (!+offset ? 0 : +offset);
    }

    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    function fmtDate(fmtStr, time) {
      return fmtDateBase(fmtStr, time, false);
    }

    /**
     * [fn.fmtUtcDate] 获取格式化的UTC时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    function fmtUtcDate(fmtStr, time) {
      return fmtDateBase(fmtStr, time, true);
    }

    /**
     * [fn.fmtXyzDate] 获取格式化指定时差的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     * @param offset : number
     */
    function fmtXyzDate(fmtStr, time, offset) {
      var date = dateBase(time);
      if (!date.getTime()) return '';
      var ms = date.getUTCMilliseconds()
        , tm = timestamp(fmtUtcDate('yyyy/MM/dd hh:mm:ss', time)) + ms + (!+offset ? 0 : +offset);
      return fmtDate(fmtStr, tm);
    }

    /**
     * [fn.match] 字符串匹配
     * @param source : any
     * @param cases  ：object
     * @param isExec : boolean = true
     */
    function match(source, cases, isExec) {
      if (!isObj(cases)) throwErr('obj');
      if (isUdf(isExec)) isExec = true;
      var symbol = MATCH_SYMBOL;
      if (has(cases, source)) {
        symbol = source;
      } else if (has(cases, 'default')) {
        symbol = 'default';
      }
      var matched = cases[symbol];
      if (matched === MATCH_NEST) {
        var ks = keys(cases), i = ks.indexOf(symbol) - 1;
        while (++i < ks.length) if (cases[ks[i]] !== MATCH_NEST) {
          matched = cases[ks[i]];
          break;
        }
      }
      if (isExec && isFun(matched)) {
        return len(matched) ? matched(source) : matched();
      } else {
        return matched === MATCH_NEST ? UDF : matched;
      }
    }

    /**
     * [fn.pretty] 转换成格式化字符串
     * @param srcObj : any
     */
    function pretty(srcObj) {
      return typeOf(srcObj, 'arr', 'obj') ? JSON.stringify(srcObj, null, 2) : String(srcObj);
    }

    /**
     * [fn.escape] 编码HTML字符串
     * @param srcStr : string
     */
    function escape(srcStr) {
      forEach(deCodes, function (str, idx) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), enCodes[idx]);
      });
      return srcStr;
    }

    /**
     * [fn.unescape] 解码HTML字符串
     * @param srcStr : string
     */
    function unescape(srcStr) {
      forEach(enCodes, function (str, idx) {
        srcStr = srcStr.replace(new RegExp(str, 'g'), deCodes[idx]);
      });
      return srcStr;
    }

    /**
     * [fn.capitalize] 字符串首字母大写
     * @param srcStr : string
     */
    function capitalize(srcStr) {
      return typeVal(srcStr, 'str') ? srcStr[0].toUpperCase() + srcStr.substr(1) : srcStr;
    }

    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number : number
     * @param digit  : number = 2
     */
    function fmtCurrency(number, digit) {
      if (isUdf(digit)) digit = 2;
      var nbArr = String(number.toFixed(digit)).split('.')
        , integer = nbArr[0]
        , decimal = nbArr.length > 1 ? nbArr[1] : ''
        , integerStr, spn, sti, i;
      spn = Math.floor(integer.length / 3);
      sti = integer.length % 3;
      integerStr = integer.substr(0, sti);
      for (i = 0; i < spn; i++) {
        integerStr += (i === 0 && (integerStr === '-' || !integerStr)) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
        sti += 3;
      }
      return decimal ? integerStr + '.' + decimal : integerStr;
    }

    /**
     * [fn.maskString] 编码字符串或其子串
     * @param srcStr : any
     * @param start  : number
     * @param length : number
     * @param mask   : string = '*'
     */
    function maskString(srcStr, start, length, mask) {
      var str = String(srcStr), ptn = /[^\u4e00-\u9fa5]/mg, ptn_ = /[\u4e00-\u9fa5]/mg;
      if (isStr(length)) mask = length, length = UDF;
      if (!isStr(mask)) mask = '*';
      var maskStr = str.substr(start, length).replace(ptn, mask).replace(ptn_, mask + mask);
      return str.substr(0, start) + maskStr + (isUdf(length) ? '' : str.substr(start + length));
    }

    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param srcStr : string
     * @param length : number
     */
    function cutString(srcStr, length) {
      var tmpChar, tmpStr = '', count = 0, i = -1;
      while (++i < srcStr.length) {
        if (count >= length) break;
        tmpChar = srcStr.substr(i, 1);
        tmpStr += tmpChar;
        count += matchPattern(tmpChar, 'dbChar') ? 2 : 1;
      }
      return tmpStr + '...';
    }

    /**
     * [fn.parseQueryStr] 解析Url参数成对象
     * @param url : string
     */
    function parseQueryStr(url) {
      if (!contains(url, '?')) return {};
      var queryStr = url.substring(url.lastIndexOf('?') + 1);
      if (queryStr === '') return {};
      var querys = queryStr.split('&'), params = {}, i = -1;
      while (++i < querys.length) {
        var kw = querys[i].split('=')
          , decode = decodeURIComponent;
        params[decode(kw[0])] = decode(kw[1] || '');
      }
      return params;
    }

    /**
     * [fn.stringifyQueryStr] 把对象编译成Url参数
     * @param obj : object
     */
    function stringifyQueryStr(obj) {
      if (!typeOf(obj, 'obj', 'arr')) return '';
      obj = JSON.parse(JSON.stringify(obj));
      if (!len(obj)) return '';
      var pairs = [];
      forIn(obj, function (key, value) {
        var encode = encodeURIComponent;
        pairs.push(encode(key) + '=' + encode(value));
      });
      return '?' + pairs.join('&');
    }

    /**
     * [fn.setPattern]设置一个正则表达式
     * @param ptnMap  : string|object
     * @param pattern : regexp [?]
     */
    function setPattern(ptnMap, pattern) {
      if (ptnMap && isStr(ptnMap)) {
        isReg(pattern) ? patterns[ptnMap] = pattern : throwErr('reg');
      } else if (isObj(ptnMap)) {
        forIn(ptnMap, function (ptn, ptnVal) {
          isReg(ptnVal) ? patterns[ptn] = ptnVal : throwErr('reg');
        });
      };
    }

    /**
     * [fn.getPattern]获取一个通用的正则表达式
     * @param type_ : string
     * @param limit : boolean = true
     */
    function getPattern(type_, limit) {
      if (!type_) return;
      if (isUdf(limit)) limit = true;
      if (contains(['all', 'list'], type_)) return keys(patterns);
      if (!has(patterns, type_)) return UDF;
      var pattern = patterns[type_];
      return limit ? new RegExp('^(' + pattern.source.replace(/^(\^|\$)$/mg, '') + ')$') : pattern;
    }

    /**
     * [fn.testPattern]用一个或几个通用正则测试
     * @param srcStr : string
     * @param type_  : 'cnChar'|'dbChar'|'email'|'phone'|'telephone'|'idCard'|'uuid'|'base64Code'|'domain'|
     * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    var testPattern = rest(function (srcStr, type_, types) {
      if (!srcStr || !type_) return false;
      return patternBase(srcStr, [type_].concat(types), true);
    });

    /**
     * [fn.matchPattern]与一个或几个通用正则匹配
     * @param srcStr : string
     * @param type_  : 'cnChar'|'dbChar'|'email'|'phone'|'telephone'|'idCard'|'uuid'|'base64Code'|'domain'|
     * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    var matchPattern = rest(function (srcStr, type_, types) {
      if (!srcStr || !type_) return null;
      return patternBase(srcStr, [type_].concat(types), false);
    });

    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = true
     * trailing: boolean = true
     */
    function throttle(func, wait, options) {
      var leading = true, trailing = true;
      if (!isFun(func)) throwErr('fun');
      if (isObj(options)) {
        leading = has(options, 'leading') ? !!options.leading : leading;
        trailing = has(options, 'trailing') ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * [fn.debounce] 防抖函数, 适用于获取用户输入或防止函数频繁调用
     * @param  func    : function
     * @param  wait    : number
     * @param  options : object|boolean [?] 为true时，leading = true, trailing = false;
     * leading: boolean = false
     * maxing: boolean = false
     * maxWait: number = Math.max(0, wait)
     * trailing: boolean = true
     */
    function debounce(func, wait, options) {
      if (!isFun(func)) throwErr('fun');
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime
        , lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      wait = +wait || 0;
      if (typeVal(options, 'bol')) {
        leading = true, trailing = false;
      } else if (isObj(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        if (maxing) maxWait = Math.max(+options.maxWait || 0, wait);
        if (has(options, 'trailing')) trailing= !!options.trailing;
      };
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = UDF;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime;
        return (isUdf(lastCallTime) || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && (time - lastInvokeTime) >= maxWait));
      }
      function timerExpired() {
        var time = Date.now();
        if (shouldInvoke(time)) return trailingEdge(time);
        var timeWaiting = wait - (time - lastCallTime)
          , waitingTime = maxing ? Math.min(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting;
        timerId = timeout(waitingTime, timerExpired);
      }
      function trailingEdge(time) {
        timerId = UDF;
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = UDF;
        return result;
      }
      function debounced() {
        var time = Date.now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments, lastThis = this, lastCallTime = time;
        if (isInvoking) {
          if (isUdf(timerId)) {
            lastInvokeTime = lastCallTime;
            timerId = timeout(wait, timerExpired);
            return leading ? invokeFunc(lastCallTime) : result;
          }
          if (maxing) {
            timerId = timeout(wait, timerExpired);
            return invokeFunc(lastCallTime);
          }
        }
        if (isUdf(timerId)) timerId = timeout(wait, timerExpired);
        return result;
      }
      debounced.cancel = function () {
        if (!isUdf(timerId)) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = UDF;
      };
      debounced.flush = function () {
        return isUdf(timerId) ? result : trailingEdge(Date.now());
      };
      return debounced;
    }

    /**
     * [fn.chalk] 返回带颜色的字符串
     * @param srcStr : string
     * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
     */
    function chalk(srcStr, color) {
      return colorList[has(colorList, color) ? color : 'default'] + srcStr + colorEnd;
    }

    /**
     * [fn.print] 在控制台打印值
     * @param value  : any
     * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
     */
    function print(value, color) {
      console.log(chalk(pretty(value), color));
    }

    /**
     * [fn.log] 在控制台打印格式化的值
     * @param value   : any
     * @param title   : string|boolean [?]
     * @param configs : object [?]
     * title: string,
     * width: number = 66 [30-100],
     * pre:   boolean = false,
     * end:   boolean = false,
     * breakPre: boolean = false,
     * breakEnd: boolean = false,
     * isFmt:      boolean = true
     * isShowTime: boolean = true
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
     * color:   'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' = 'cyan'
     */
    function log(value, title, configs) {
      var isFmt;
      function getIsFmt(configs) {
        return has(configs, 'isFmt', 'bol') ? configs.isFmt : true;
      };
      function getTitle(configs) {
        return get(configs, 'title', 'str') || 'funclib(' + version + ')';
      };
      if (typeVal(title, 'str')) {
        if (isBol(configs)) {
          isFmt = configs, configs = {};
        } else {
          isFmt = getIsFmt(configs);
        }
      }
      else if (isBol(title)) {
        isFmt = title, title = getTitle(configs);
      }
      else if (isObj(title)) {
        configs = title, isFmt = getIsFmt(configs), title = getTitle(configs);
      }
      else {
        isFmt = true;
        title = 'funclib(' + version + ')';
      }
      var isShowTime = has(configs, 'isShowTime') ? !!configs.isShowTime : true;
      var _time = fmtDate('hh:mm:ss', new Date());
      var time = isShowTime ? '[' + _time + '] ' : '';
      title = title.replace(/\n/mg, '');
      var originTtLength = (time + title + '[] ').length;
      if (!isFmt) {
        title = '( ' + title + ' )';
      }
      if (time) {
        time = '[' + chalk(_time, 'grey') + '] ';
      }
      title = chalk(title, get(configs, 'ttColor'));
      title = time + title;
      var width = get(configs, 'width', 'num');
      if (!width || width < 30 || width > 100) width = 66;
      if (originTtLength > width) {
        var fixLength = title.length - originTtLength - colorEnd.length;
        title = cutString(title, width + fixLength - 3) + colorEnd;
      }
      else if (isFmt) {
        title = array((width - originTtLength) / 2, ' ').join('') + title;
      }
      var valuec = get(configs, 'color');
      if (!has(colorList, valuec)) valuec = 'cyan';
      var isBreakPre = get(configs, 'breakPre', 'bol');
      var isBreakEnd = get(configs, 'breakEnd', 'bol');
      if (!isFmt) {
        if (isBreakPre) console.log('');
        console.log(title + ':');
        try {
          console.log(chalk(pretty(value), valuec));
        } catch (e) {
          console.log(colorList[valuec], value, colorEnd);
        }
        if (isBreakEnd) console.log('');
      }
      else {
        var sgLine_1 = '', dbLine_1 = '';
        for(var i = 0; i < width; i ++ ) { sgLine_1 += '-', dbLine_1 += '='; };
        if (get(configs, 'pre', 'bol')) {
          console.log('\n' + dbLine_1);
          console.log(title);
          console.log(sgLine_1);
        }
        else if (get(configs, '/end', 'bol')) {
          console.log(dbLine_1 + '\n');
        }
        else {
          if (isBreakPre) console.log('');
          console.log(dbLine_1);
          console.log(title);
          console.log(sgLine_1);
          try {
            console.log(chalk(pretty(value), valuec));
          } catch (e) {
            console.log(colorList[valuec], value, colorEnd);
          }
          console.log(dbLine_1);
          if (isBreakEnd) console.log('');
        }
      }
    }

    /**
     * [fn.rd] 读文件
     * @param file : string
     */
    function rd(file) {
      return fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
    }

    /**
     * [fn.wt] 写文件
     * @param file : string
     * @param text : string
     * @param flag : 'w'|'a' = 'w'
     */
    function wt(file, text, flag) {
      if (flag === void 0) { flag = 'w'; }
      fs.writeFileSync(file, text, { encoding: 'utf8', flag: flag });
    }

    /**
     * [fn.cp] 复制文件或文件夹
     * @param src  : string
     * @param dist : string
     * @param isInner : boolean
     */
    function cp(src, dist, isInner) {
      function copy(src_, dst_, isOnInit) {
        if (fs.existsSync(src_)) {
          var stat = fs.statSync(src_);
          if (stat.isFile()) {
            if (!path.extname(dst_) && (path.extname(src_) || path.basename(src_) !== path.basename(dst_))) {
              mk(dst_);
              dst_ = path.join(dst_, path.basename(src_));
            }
            fs.createReadStream(src_).pipe(fs.createWriteStream(dst_));
          }
          else if (stat.isDirectory()) {
            if (isOnInit && !isInner) {
              dst_ = path.join(dst_, path.basename(src_));
            }
            mk(dst_);
            var subSrcs = fs.readdirSync(src_);
            subSrcs.forEach(function (file) {
              var subSrc = path.join(src_, file);
              var subDist = path.join(dst_, file);
              copy(subSrc, subDist, false);
            });
          }
        }
      }
      return copy(src, dist, true);
    }

    /**
     * [fn.mv] 移动文件或文件夹
     * @param src  : string
     * @param dist : string
     */
    function mv(src, dist) {
      try {
        fs.renameSync(src, dist);
      }
      catch (e) {
        cp(src, dist);
        rm(src);
      }
    }

    /**
     * [fn.rm] 删除文件或文件夹
     * @param src : string
     */
    function rm(src) {
      if (fs.existsSync(src)) {
        var stat = fs.statSync(src);
        if (stat.isFile()) {
          fs.unlinkSync(src);
        }
        else if (stat.isDirectory()) {
          var subSrcs = fs.readdirSync(src);
          forEach(subSrcs, function (file) {
            var subSrc = path.join(src, file);
            rm(subSrc);
          });
          try {
            fs.rmdirSync(src);
          } catch (e) {
            defer(function() {
              if (/^win/.test(process.platform)) {
                var absSrc = path.resolve(src);
                execSync('rd /s /q ' + absSrc);
              } else {
                execSync('rm -rf ' + src);
              }
            })
          }
        }
      }
    }

    /**
     * [fn.mk] 创建文件夹
     * @param dir : string
     */
    function mk(dir) {
      var absDir = path.resolve(dir);
      if (!fs.existsSync(absDir)) {
        try {
          fs.mkdirSync(absDir);
        }
        catch (e) {
          mk(path.dirname(absDir));
          fs.mkdirSync(absDir);
        }
      }
    }

    /**
     * [fn.size] 获取文件的大小
     * @param file   : string
     * @param unit  : 'b'|'kb'|'mb'|'gb'|'tb' = 'kb'
     * @param digit : number = 2
     */
    function size(file, unit, digit) {
      if (fs.existsSync(file)) {
        if (isNum(unit)) digit = unit, unit = UDF;
        if (!isNum(digit)) digit = 2;
        var flSize = fs.statSync(file)['size'];
        var rlSize = match(unit, {
          'b': flSize,
          'kb': flSize / 1024,
          'mb': flSize / 1024 / 1024,
          'gb': flSize / 1024 / 1024 / 1024,
          'tb': flSize / 1024 / 1024 / 1024 / 1024,
          'default': flSize / 1024
        });
        return Number(rlSize).toFixed(digit);
      }
    }

    /**
     * [fn.clear] 命令行清屏
     */
    function clear() {
      process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    }

    /**
     * [fn.progress] 进度显示工具
     * @param title: string
     * @param options: object [?]
     * title: string
     * width: number = 40
     * type : 'bar'|'spi' = 'bar'
     * isClear: boolean = true
     * isBreak: boolean = true
     */
    function progress(title, options) {
      var progressInstance, duration, pgType, flag
        , isStoped = false
        , progressTimerId = 'FN_PROGRESS_TIMER'
        , isClear = get(options, 'isClear', 'bol');
      if (isObj(title)) {
        options = title, title = UDF;
      }
      if (!options) options = {};
      title = typeVal(title, 'str') || get(options, 'title', 'str') || 'funclib ' + version;
      pgType = get(options, 'type', 'str');
      pgType = pgType === 'spi' ? pgType : 'bar';
      if (has(options, 'isBreak', 'bol') ? options.isBreak : true) console.log('');
      if (pgType === 'bar') {
        timeout(progressTimerId).clear();
        pgType = 'bar';
        duration = 250;
        progressInstance = new ProgressBar((title || '[fn.progress]') + ' [:bar] :percent', {
          clear: isClear,
          complete: '=',
          incomplete: ' ',
          width: options['width'] || 40,
          total: options['total'] || 20,
        });
      } else {
        interval(progressTimerId).clear();
        progressInstance = new ProgressSpi(title);
      }
      start();
    
      /**
       * [fn.progress.pause] 暂停进度
       */
      function pause() {
        if (pgType === 'bar') {
          timeout(progressTimerId).clear();
        } else {
          flag = progressInstance.flag;
          interval(progressTimerId).clear();
        }
      }
    
      /**
       * [fn.progress.start] 开始进度
       */
      function start() {
        if (pgType === 'bar') {
          tick(isStoped ? '-' : '+');
        } else {
          interval(progressTimerId, 180, function () {
            if (flag) {
              progressInstance.flag = flag;
              flag = '';
            }
            progressInstance.tick();
          });
        }
      }
    
      /**
       * [fn.progress.stop] 结束进度
       * @param onStopped : function [?]
       */
      function stop(onStopped) {
        isStoped = true;
        if (pgType === 'bar') {
          duration = 600;
          tick('-', function () {
            pgType = null;
            progressInstance.terminate();
            if (isFun(onStopped)) onStopped();
          });
        } else {
          interval(progressTimerId).clear();
          pgType = null;
          progressInstance.terminate(isClear);
          if (isFun(onStopped)) onStopped();
        }
      }
    
      /**
       * [fn.progress.clear] 立即结束进度条，并触发回调
       * @param onStopped : function [?]
       * @param isBrk : function [?]
       */
      function clear(onStopped) {
        if (pgType === 'bar') {
          progressInstance.complete = true;
          timeout(progressTimerId).clear();
          progressInstance.terminate();
        } else {
          interval(progressTimerId).clear();
          progressInstance.terminate(isClear);
        }
        pgType = null;
        if (isFun(onStopped)) onStopped();
      }
    
      function tick(tickType, onStopped, limited) {
        timeout(progressTimerId, duration, function () {
          if (!limited) progressInstance.tick();
          switch (tickType) {
            case '+': duration += 300; break;
            case '-': duration -= duration * 0.2; break;
          };
          if (!progressInstance.complete) {
            var isLimit = tickType === '+' && progressInstance.curr === progressInstance.total -1;
            tick(tickType, onStopped, isLimit);
          }
          else if (onStopped) {
            onStopped();
          }
        });
      }
    
      progress.pause = pause;
      progress.start = start;
      progress.stop = stop;
      progress.clear = clear;
    }

    /**
     * [fn.chain] funclib链接调用
     * @param value: any
     */
    function chain(value) {
      var chainedFn = { 'value': value };
      chainedFn.val = function () {
        return chainedFn.value;
      };
      forEach(keys(funclib), function (method) {
        if (method === 'match') {
          chainedFn[method] = function () {
            strProto[method].call(arguments);
          }
        } else {
          chainedFn[method] = rest(function (args) {
            if (!isUdf(chainedFn.value)) {
              args = [chainedFn.value].concat(args);
            }
            return chain(isFun(fn[method]) ? fn[method].apply(void 0, args) : fn[method]);
          });
        }
      });
      return chainedFn;
    }

    /**
     * [fn.noConflict] 释放fn变量占用权
     */
    function noConflict() {
      if (root.fn === this) root.fn = oldFn;
      return this;
    }

    /**
     * Throw error method.
     */
    function throwErr(type_) {
      switch(type_) {
        case 'arg': throw new TypeError('Arguments type error!');
        case 'obj': throw new TypeError('Expect an Object param!');
        case 'fun': throw new TypeError('Expect a Function param!');
        case 'reg': throw new TypeError('Expect a RegExp pattern!');
      }
    }

    /**
     * Basic methods of array filter and reject.
     */
    function filterBase(srcArr, predicate, isFilter) {
      var fts = [], rjs = [];
      forEach(srcArr, function (item) {
        if (isObj(predicate)) {
          keys(predicate).every(function (key) {
            return predicate[key] === item[key];
          }) ? fts.push(item) : rjs.push(item);
        }
        else if (isFun(predicate)) {
          predicate(item) ? fts.push(item) : rjs.push(item);
        }
      });
      return isFilter ? fts : rjs;
    }

    /**
     * Basic methods of collection extention.
     */
    function extendBase(tarObj, srcObj, predicate, propList, isTraDft, isOmit) {
      if (!isObj(srcObj)) return tarObj;
      propList = flatten(propList);
      var isPdtObj = isObj(predicate)
        , srcKs = keys(srcObj);
      function traversal(tarObj, srcObj, propList) {
        forEach(propList, function (prop) {
          if (has(srcObj, prop)) {
            tarObj[prop] = srcObj[prop];
          } else if (isPdtObj && has(predicate, 'default')) {
            tarObj[prop] = predicate.default;
          }
        });
      }
      if (typeOf(predicate, 'str', 'arr', 'obj')) {
        var props = isPdtObj ? propList : toArr(predicate).concat(propList);
        if (isOmit) {
          props = srcKs.filter(function (key) {
            return !contains(props, key);
          });
        }
        traversal(tarObj, srcObj, props);
      } else if (isFun(predicate)) {
        forIn(srcObj, function (key, val) {
          var isPred = predicate(key, val);
          if ((isPred && !isOmit ) || (!isPred && isOmit)) {
            tarObj[key] = val;
          }
        });
      }
      else if (isTraDft) {
        traversal(tarObj, srcObj, srcKs);
      }
      return tarObj;
    }

    /**
     * Util method for path.
     */
    function getPaths(pathStr) {
      return contains(pathStr, '.') ? drop(pathStr.split('.')) : drop(pathStr.split('/'));
    }

    /**
     * Basic methods of timers.
     */
    function timerBase(timerId, duration, callback, leading, type_) {
      var timers, setTimer, clearTimer, tempVar;
      if (type_ === 'interval') {
        timers = intervalTimers,
        setTimer = setInterval,
        clearTimer = clearInterval;
      } else if (type_ === 'timeout') {
        timers = timeoutTimers,
        setTimer = setTimeout,
        clearTimer = clearTimeout;
      }
      if (isUdf(timerId) || isNul(timerId)) {
        return { id: null,  stop: F, clear: F };
      } else if (typeVal(timerId, 'str')) {
        if (isUdf(duration)) {
          return { id: timers[timerId], stop: invokeClear, clear: invokeClear };
        } else if (contains([null, false], duration)) {
          invokeClear();
          return timers[timerId] = null;
        } else if (isFun(duration)) {
          tempVar = duration,
          duration = typeVal(callback, 'num') || 0,
          callback = tempVar;
        }
      } else if (isNum(timerId) && isFun(duration)) {
        if (isBol(callback)) leading = callback;
        callback = duration, duration = timerId, timerId = UDF;
      } else if (isFun(timerId)) {
        tempVar = timerId;
        if (isNum(duration)) {
          timerId = typeVal(callback, 'str') || UDF;
        } else if (typeVal(duration, 'str')) {
          timerId = duration,
          duration = typeVal(callback, 'num') || 0;
        } else {
          timerId = UDF, duration = 0;
        }
        callback = tempVar;
      }
      if (isFun(callback) && isNum(duration)) {
        if (leading) callback();
        if (duration < 0) duration = 0;
        if (!timerId) return setTimer(callback, duration);
        if (typeVal(timerId, 'str')) {
          invokeClear();
          return timers[timerId] = setTimer(callback, duration);
        }
      }
      function invokeClear() {
        return clearTimer(timers[timerId]);
      };
    }

    /**
     * Get data methods object.
     */
    function getTimeObj(date, isUtc) {
      return isUtc ? {
        'y+': date.getUTCFullYear(),
        'M+': date.getUTCMonth() + 1,
        'd+': date.getUTCDate(),
        'h+': date.getUTCHours(),
        'm+': date.getUTCMinutes(),
        's+': date.getUTCSeconds(),
        'S':  date.getUTCMilliseconds(),
        'q+': Math.floor((date.getUTCMonth() + 3) / 3)
      } : {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S': date.getMilliseconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3)
      }
    }

    /**
     * Transfer time to Date object.
     */
    function dateBase(time) {
      if (isDat(time)) return time;
      time = String(time);
      return new Date(time.match(/^\-?[0-9]*$/) ? +time : time);
    }

    /**
     * Basic methods of date formation.
     */
    function fmtDateBase(fmtStr, time, isUtc) {
      var date = dateBase(time)
        , dateTime = date.getTime();
      if (!dateTime && dateTime !== 0) {
        return '';
      }
      var timeObj = getTimeObj(date, isUtc);
      forIn(timeObj, function (k) {
        if (new RegExp('(' + k + ')').test(fmtStr)) {
          if (k === 'y+') {
            fmtStr = fmtStr.replace(RegExp.$1, (timeObj['y+'] + '').substr(4 - RegExp.$1.length));
          } else {
            var tmk = timeObj[k]
              , fmt = RegExp.$1.length === 1 ? tmk : ('00' + tmk).substr((tmk + '').length);
            fmtStr = fmtStr.replace(RegExp.$1, fmt);
          }
        }
      });
      return fmtStr;
    }

    /**
     * Basic methods of patterns match.
     */
    function patternBase(srcStr, types, isTest) {
      var limit = true
        , ttRst =false
        , mtRst = null;
      if (types.length && typeOf(types[types.length - 1], 'bol')) {
        limit = types.pop();
      }
      for (var i = 0; i < types.length; i++) {
        var pattern = getPattern(types[i], limit);
        if (pattern) {
          isTest
            ? ttRst = pattern.test(srcStr)
            : mtRst = srcStr.match(pattern);
          if (ttRst || mtRst) break;
        }
      }
      return isTest ? ttRst : mtRst;
    }

    /**@funclib
     * [fn().method] funclib链接调用
     * @param value: any
     */
    function funclib(value) {
      return chain(value);
    }

    funclib.typeOf = typeOf;
    funclib.typeVal = typeVal;
    funclib.isStr = isStr;
    funclib.isNum = isNum;
    funclib.isBol = isBol;
    funclib.isFun = isFun;
    funclib.isNul = isNul;
    funclib.isUdf = isUdf;
    funclib.isErr = isErr;
    funclib.isDat = isDat;
    funclib.isReg = isReg;
    funclib.isArr = isArr;
    funclib.isObj = isObj;

    funclib.array = array;
    funclib.range = range;
    funclib.toArr = toArr;
    funclib.indexOf = indexOf;
    funclib.find = find;
    funclib.filter = filter;
    funclib.reject = reject;
    funclib.contains = contains;
    funclib.drop = drop;
    funclib.flatten = flatten;
    funclib.pluck = pluck;
    funclib.uniq = uniq;
    funclib.forEach = forEach;
    funclib.each = forEach;
    funclib.sortBy = sortBy;

    funclib.len = len;
    funclib.has = has;
    funclib.get = get;
    funclib.set = set;
    funclib.keys = keys;
    funclib.pick = pick;
    funclib.omit = omit;
    funclib.extend = extend;
    funclib.forIn = forIn;
    funclib.deepCopy = deepCopy;
    funclib.isEmpty = isEmpty;
    funclib.isDeepEqual = isDeepEqual;

    funclib.random = random;
    funclib.randomId = randomId;
    funclib.randomColor = randomColor;

    funclib.interval = interval;
    funclib.timeout = timeout;
    funclib.defer = defer;
    funclib.time = timestamp;
    funclib.timestamp = timestamp;
    funclib.asUtcTime = asUtcTime;
    funclib.asXyzTime = asXyzTime;
    funclib.fmtDate = fmtDate;
    funclib.fmtUtcDate = fmtUtcDate;
    funclib.fmtXyzDate = fmtXyzDate;

    funclib.match = match;
    funclib.pretty = pretty;
    funclib.escape = escape;
    funclib.unescape = unescape;
    funclib.capitalize = capitalize;
    funclib.fmtCurrency = fmtCurrency;
    funclib.maskString = maskString;
    funclib.cutString = cutString;
    funclib.parseQueryStr = parseQueryStr;
    funclib.stringifyQueryStr = stringifyQueryStr;

    funclib.setPattern = setPattern;
    funclib.getPattern = getPattern;
    funclib.testPattern = testPattern;
    funclib.matchPattern = matchPattern;

    funclib.rest = rest;
    funclib.throttle = throttle;
    funclib.debounce = debounce;

    var arrProto = Array.prototype , strProto = String.prototype , extMethods = [
      'pop', 'push', 'concat', 'join', 'reverse', 'shift', 'slice', 'split', 'sort', 'substr', 'substring', 'splice',
      'splice', 'unshift', 'every', 'some', 'map', 'reduce', 'trim', 'toLowerCase', 'toUpperCase', 'replace', 'search',
    ];
    forEach(extMethods, function(method) {
      funclib[method] = rest(function(args) {
        var proto, arg0 = args.shift();
        if (isArr(arg0) && has(arrProto, method)) proto = arrProto;
        if (isStr(arg0) && has(strProto, method)) proto = strProto;
        if (proto) return proto[method].apply(arg0, args);
        throwErr('arg');
      });
    });

    funclib.chalk = chalk;
    funclib.print = print;
    funclib.log = log;
    funclib.rd = rd;
    funclib.wt = wt;
    funclib.cp = cp;
    funclib.mv = mv;
    funclib.rm = rm;
    funclib.mk = mk;
    funclib.size = size;
    funclib.clear = clear;
    progress.stop = new Function();
    progress.start = progress;
    funclib.progress = progress;

    funclib.chain = chain;
    funclib.noConflict = noConflict;
    funclib.version = version;

    return funclib;
  })();

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.fn = fn;
    define(function () {
      return fn;
    });
  }
  else if (_module) {
    (_module.exports = fn).fn = fn;
    _module.fn = fn;
  }
  else {
    root.fn = fn;
  }

}.call(this));
