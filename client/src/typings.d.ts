/* SystemJS module definition */
declare var jQuery: any;
declare var $: any;
declare var win: any;
declare var saveAs: any;
declare var window: Window;
declare var module: NodeModule;
interface NodeModule { id: string; }
declare var fn: fn.Funclib;

declare namespace fn {

  type Any = any;
  
  type Type = 'arr' | 'obj' | 'fun' | 'str' | 'num' | 'bol' | 'udf'
            | 'nul' | 'err' | 'reg' | 'dat' | string | string[];

  type Color = 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow';

  type Pattern = 'cnChar' | 'dbChar' | 'email' | 'mobPhone' | 'telPhone' | 'idCard' | 'uuid'
               | 'base64Code' | 'domain' | 'port' | 'ip' | 'ipUrl' | 'domainUrl' | 'url' | string

  interface Progress {
    /**
     * [fn.progress] 进度显示工具
     * @param title: string
     * @param options: object [?]
     * title: string
     * width: number = 40
     * type : 'bar'|'spi' = 'bar'
     */
    (title: string, options?: { title?: string, width?: number, type?: 'bar' | 'spi' }): void;

    /**
     * [fn.progress.start] 进度显示工具
     * @param title: string
     * @param options: object [?]
     * title: string
     * width: number = 40
     * type : 'bar'|'spi' = 'bar'
     */
    start(title: string, options?: { title?: string, width?: number, type?: 'bar' | 'spi' }): void;

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param onStopped : function [?]
     */
    stop(onStopped?: Function): void;

    /**
     * [fn.progress.stop] 立即结束进度条，并触发回调
     * @param onStopped : function [?]
     */
    clear(onStopped?: Function): void;
  }

  interface Timer extends Any {
    /**
     * 定时器ID
     */
    id: any;

    /**
     * 关闭定时器
     */
    stop: () => any;

    /**
     * 关闭定时器
     */
    clear: () => any;
  }

  interface FullScreenChange {
    /**
     * [fn.fullScreenChange] 全屏状态变化事件
     * @param callback function
     */
    (callback: Function): { remove: () => void };

    /**
     * [fn.fullScreenChange.removeAll] 清除所有全屏状态变化事件
     */
    removeAll: () => void;
  }

  interface LogConfig {
    title?: string, width?: number, isFmt?: boolean, isShowTime?: boolean,
    pre?: boolean, end?: boolean,
    ttColor?: 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow',
    color?: 'grey' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'yellow'
  }

  interface Funclib extends Any {
    
    /**
     * [fn.version] 获取版本号
     */
    version: string;

    /**
     * [fn.progress] 进度显示工具
     */
    progress: Progress;

    /**
     * [fn.fullScreenChange] 全屏状态变化事件
     */
    fullScreenChange: FullScreenChange;

    /**
     * [fn().method] 使用OOP风格的调用
     * @param value : any 目标方法的第一个参数
     */
    (value?: any): any;

    /**
     * [fn.typeOf] 检查值的类型
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    typeOf(value: any, type_: Type | Type[] | any, ...types: Type[]): boolean;

    /**
     * [fn.typeVal] 获取期望类型的值
     * @param value : any
     * @param type_ : string|string[]
     * @param types : ...string[]
     */
    typeVal(value: any, type_: Type | Type[], ...types: Type[]): any;

    /**
     * [fn.isStr] 判断类型是否为：string
     * @param value : any
     */
    isStr(value: any): boolean;

    /**
     * [fn.isNum] 判断类型是否为：number
     * @param value : any
     * @param impure : boolean = false
     */
    isNum(value: any, impure?: boolean): boolean;

    /**
     * [fn.isBol] 判断类型是否为：boolean
     * @param value : any
     */
    isBol(value: any): boolean;

    /**
     * [fn.isFun] 判断类型是否为：function
     * @param value : any
     */
    isFun(value: any): boolean;

    /**
     * [fn.isNul] 判断是否为：null
     * @param value : any
     */
    isNul(value: any): boolean;

    /**
     * [fn.isUdf] 判断类型是否为：undefined
     * @param value : any
     */
    isUdf(value: any): boolean;

    /**
     * [fn.isErr] 判断类型是否为：Error
     * @param value : any
     */
    isErr(value: any): boolean;

    /**
     * [fn.isDat] 判断类型是否为：Date
     * @param value : any
     */
    isDat(value: any): boolean;

    /**
     * [fn.isReg] 判断类型是否为：RegExp
     * @param value : any
     */
    isReg(value: any): boolean;

    /**
     * [fn.isArr] 判断类型是否为：Array
     * @param value : any
     */
    isArr(value: any): boolean;

    /**
     * [fn.isObj] 判断是否为：正常Object
     * @param value : any
     */
    isObj(value: any): boolean;

    /**
     * [fn.array] 返回一个指定长度和默认值的数组
     * @param length : number
     * @param value  : any|function [?]
     */
    array(length: number, value?: any): any[];

    /**
     * [fn.range] 返回一个范围数组
     * @param start  : number [?]
     * @param length : number
     */
    range(start: number, length?: number): number[];

    /**
     * [fn.toArr] 值数组化
     * @param value : any
     */
    toArr(value: any): any[];

    /**
     * [fn.indexOf] 寻找值在数组中的索引
     * @param srcArr    : array|string
     * @param predicate : object|function|any
     */
    indexOf(srcArr: any[] | string, predicate: any): number;

    /**
     * [fn.find] 根据条件取值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    find(srcArr: any[], predicate: any): any;

    /**
     * [fn.filter] 根据条件取过滤值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    filter(srcArr: any[], predicate: any): any[];

    /**
      * [fn.reject] 根据条件过滤值
      * @param srcArr    : array
      * @param predicate : object|function|any
      */
    reject(srcArr: any[], predicate: any): any[];

    /**
     * [fn.contains] 判断数组是否包含符合条件的值
     * @param srcArr    : array
     * @param predicate : object|function|any
     */
    contains(srcArr: any[], predicate: any): boolean;

    /**
     * [fn.drop] 去掉空数组、空对象及布尔化后为false的值
     * @param srcArr  : array
     * @param isDrop0 : boolean = false
     */
    drop(srcArr: any[], isDrop0?: boolean): any[];

    /**
     * [fn.flatten] 把有结构的数组打散，减少层数
     * @param srcArr : array
     * @param isDeep : boolean = false
     */
    flatten(srcArr: any[], isDeep?: boolean): any[];

    /**
     * [fn.pluck] 把结构中的字段取出合并到一个数组中
     * @param srcArr  : array
     * @param pathStr : string
     */
    pluck(srcArr: any, pathStr: string): any[];

    /**
     * [fn.uniq] 去重或根据字段去重
     * @param srcArr  : array
     * @param pathStr : string [?]
     * @param isDeep  : boolean = true
     */
    uniq(srcArr: any[], pathStr?: string, isDeep?: boolean): any[];

    /**
     * [fn.each] 遍历数组或类数组
     * @param srcObj   : array|object
     * @param iteratee : function
     */
    each(srcObj: any, iteratee: any): any;

    /**
     * [fn.forEach] 遍历数组或类数组
     * @param srcObj   : array|object
     * @param iteratee : function
     */
    forEach(srcObj: any, iteratee: any): any;

    /**
     * [fn.sortBy] 返回对象数组根据字段排序后的副本
     * @param srcArr : array
     * @param field  : string
     * @param isDesc : boolean = false
     */
    sortBy(srcArr: any[], field: string, isDesc?: boolean): any;

    /**
     * [fn.len] 获取对象自有属性的个数
     * @param srcObj : any
     */
    len(srcObj: any): number;

    /**
     * [fn.has] 判断对象是否存在某自有属性
     * @param srcObj   : object
     * @param property : string
     * @param types    : ...string[]
     */
    has(srcObj: any, property: string, ...types: Type[]): boolean;

    /**
     * [fn.get] 返回对象或子孙对象的属性，可判断类型
     * @param srcObj  : object
     * @param pathStr : string
     * @param types   : ...string[]
     */
    get(srcObj: Object, pathStr: string, ...types: Type[]): any;

    /**
     * [fn.set] 设置对象或子孙对象的属性
     * @param srcObj  : object
     * @param pathStr : string
     * @param value   : any
     */
    get(srcObj: Object, pathStr: string, value: any): void;

    /**
     * [fn.keys] 获取对象的键数组
     * @param srcObj : object
     */
    keys(srcObj: Object): string[];

    /**
     * [fn.pick] 获取包含部分属性的对象副本
     * @param srcObj    : object
     * @param predicate : function|string|string[]|{ default?: any }
     * @param props     : ...string[]
     */
    pick(srcObj: Object, predicate: { default?: any } | any, ...props: string[]): any;

    /**
     * [fn.omit] 获取省略部分属性的对象副本
     * @param srcObj    : object
     * @param predicate : function|string|string[]
     * @param props     : ...string[]
     */
    omit(srcObj: Object, predicate: { default?: any } | any, ...props: string[]): any;

    /**
     * [fn.extend] 给对象赋值
     * @param tarObj    : object
     * @param srcObj    : object
     * @param predicate : function|string|string[]|{ default?: any }
     * @param props     : ...string[]
     */
    extend(tarObj: any, srcObj: any, predicate?: { default?: any } | any, ...props: string[]): any;

    /**
     * [fn.forIn] 遍历对象的可数自有属性
     * @param srcObj   : object
     * @param iteratee : function
     */
    forIn(srcObj: any, iteratee: any): any;

    /**
     * [fn.deepCopy] 深拷贝对象或数组
     * @param srcObj : object
     */
    deepCopy(srcObj: any): any;

    /**
     * [fn.isEmpty] 判断对象是否为空对象或数组
     * @param srcObj : object
     */
    isEmpty(srcObj: any): boolean;

    /**
     * [fn.isDeepEqual] 判断数组或对象是否相等
     * @param obj1     : object|array
     * @param obj2     : object|array
     * @param isStrict : boolean = false
     */
    isDeepEqual(obj1: any, obj2: any, isStrict?: boolean): boolean;

    /**
     * [fn.random] 返回一个指定范围内的随机数
     * @param start : number
     * @param end   : number [?]
     * @param isFlt : boolean = true;
     */
    random(start: number, end?: number, isFlt?: boolean): number;

    /**
     * [fn.gid] 返回一个指定长度的随机ID
     * @param length : number = 12
     */
    gid(length?: number): string;

    /**
     * [fn.gcolor] 返回一个随机颜色色值
     */
    gcolor(): string;

    /**
     * [fn.interval] 循环定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     */
    interval(timerId: any, duration?: any, callback?: any): Timer;

    /**
     * [fn.timeout] 延时定时器
     * @param timerId  : string [?]
     * @param duration : number|false|null [?]
     * @param callback : function
     */
    timeout(timerId: any, duration?: any, callback?: any): Timer;

    /**
     * [fn.defer] 延迟执行函数
     * @param func : function
     */
    defer(func: Function): void;

    /**
     * [fn.time] 返回一个时间戳
     * @param time : date|string|number
     */
    time(time: Date | string | number): number;

    /**
     * [fn.timestamp] 返回一个时间戳
     * @param time : date|string|number
     */
    timestamp(time: Date | string | number): number;

    /**
     * [fn.asUtcTime] 转化为相同时间的UTC时间戳
     * @param time : date|string|number
     */
    asUtcTime(time: Date | string | number): number;

    /**
     * [fn.asXyzTime] 转化为相同时间的指定时差的时间戳
     * @param time   : date|string|number
     * @param offset : number
     */
    asXyzTime(time: Date | string | number, offset: number): number;

    /**
     * [fn.fmtDate] 获取格式化的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    fmtDate(fmtStr: string, time: Date | string | number): string;

    /**
     * [fn.fmtUtcDate] 获取格式化的UTC时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     */
    fmtUtcDate(fmtStr: string, time: Date | string | number): string;

    /**
     * [fn.fmtXyzDate] 获取格式化指定时差的时间字符串
     * @param fmtStr : string
     * @param time   : date|string|number
     * @param offset : number
     */
    fmtXyzDate(fmtStr: string, time: Date | string | number, offset: number): string;

    /**
     * [fn.match] 字符串匹配
     * @param source : any
     * @param cases  ：object
     * @param isExec : boolean = true
     */
    match(source: any, cases: Object, isExec?: boolean): any;

    /**
     * [fn.pretty] 转换成格式化字符串
     * @param srcObj : any
     */
    pretty(srcObj: any): string;

    /**
     * [fn.escape] 编码HTML字符串
     * @param srcStr : string
     */
    escape(srcStr: string): string;

    /**
     * [fn.unescape] 解码HTML字符串
     * @param srcStr : string
     */
    unescape(srcStr: string): string;

    /**
     * [fn.capitalize] 字符串首字母大写
     * @param srcStr : string
     */
    capitalize(srcStr: string): string;

    /**
     * [fn.fmtCurrency] 格式化显示货币
     * @param number : number
     * @param digit  : number = 2
     */
    fmtCurrency(number: number, digit?: number): any;

    /**
     * [fn.maskString] 编码字符串或其子串
     * @param srcStr : any
     * @param mask   : string = '*'
     * @param start  : number
     * @param length : number
     */
    maskString(srcStr: any, mask?: string, start?: number, length?: number): string;

    /**
     * [fn.cutString] 裁切字符串到指定长度
     * @param srcStr : string
     * @param length : number
     */
    cutString(srcStr: number, length: number): string;

    /**
     * [fn.parseQueryStr] 解析Url参数成对象
     * @param url : string
     */
    parseQueryStr(url: string): Object;

    /**
     * [fn.stringifyQueryStr] 把对象编译成Url参数
     * @param obj : object
     */
    stringifyQueryStr(obj: Object): string;

    /**
     * [fn.setPattern]设置一个正则表达式
     * @param ptnMap  : string|object
     * @param pattern : regexp [?]
     */
    setPattern(ptnMap: any, pattern?: any): any;

    /**
     * [fn.getPattern]获取一个通用的正则表达式
     * @param type_ : string
     * @param limit : boolean = true
     */
    getPattern(type_: string, limit?: boolean): any;

    /**
     * [fn.testPattern]用一个或几个通用正则测试
     * @param srcStr : string
     * @param type_  : 'cnChar'|'dbChar'|'email'|'mobPhone'|'telPhone'|'idCard'|'uuid'|'base64Code'|'domain'|
     * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    testPattern(srcStr: string, type_: Pattern, ...types: Pattern[]): boolean;

    /**
     * [fn.matchPattern]与一个或几个通用正则匹配
     * @param srcStr : string
     * @param type_  : 'cnChar'|'dbChar'|'email'|'mobPhone'|'telPhone'|'idCard'|'uuid'|'base64Code'|'domain'|
     * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
     * @param types  : ...string[]
     * @param limit  : boolean = true
     */
    matchPattern(srcStr: string, type_: Pattern, ...types: Pattern[]): any;

    /**
     * [fn.rest] 获取函数的剩余参数
     * @param func : function
     */
    rest(func: Function): Function;

    /**
     * [fn.throttle] 节流函数，适用于限制resize和scroll等函数的调用频率
     * @param  func    : function
     * @param  wait    : number
     * @param  options : object [?]
     * leading: boolean = true
     * trailing: boolean = true
     */
    throttle(func: Function, wait: number, options?: { leading?: boolean, trailing?: boolean }): Function;

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
    debounce(func: Function, wait: number, options?: boolean | {
      leading?: boolean, trailing?: boolean, maxing?: boolean, maxWait?: number
    }): Function;

    /**
     * [fn.fullScreen] 全屏显示HTML元素
     * @param el      : HTMLElement|selector
     * @param didFull : function [?]
     */
    fullScreen(el: any, didFull?: Function): void;

    /**
     * [fn.exitFullScreen] 退出全屏显示
     * @param didExit : function [?] 
     */
    exitFullScreen(didExit?: Function): void;

    /**
     * [fn.isFullScreen] 检测是否全屏状态
     */
    isFullScreen(): boolean;

    /**
     * [fn.copyText] 复制文本到粘贴板
     * @param text : string
     */
    copyText(text: string): void;

    /**
     * [fn.chalk] 返回带颜色的字符串
     * @param srcStr : string
     * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
     */
    chalk(srcStr: string, color?: Color): string;

    /**
     * [fn.print] 在控制台打印值
     * @param value  : any
     * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
     */
    print(value: any, color?: Color): void;

    /**
     * [fn.log] 在控制台打印格式化的值
     * @param value   : any
     * @param title   : string|boolean [?]
     * @param configs : object [?]
     * title: string,
     * width: number = 66 [30-100],
     * isFmt:      boolean = true
     * isShowTime: boolean = true
     * isSplit:    boolean = true,
     * pre:   boolean = false,
     * end:   boolean = false,
     * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
     * color:   'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' = 'cyan'
     */
    log(value: any, title?: any, configs?: LogConfig): any;

    /**
     * [fn.rd] 读文件
     * @param file : string
     */
    rd(file: string): string;

    /**
     * [fn.wt] 写文件
     * @param file : string
     * @param text : string
     * @param flag : 'w'|'a' = 'w'
     */
    wt(file: string, text: string, flag?: 'w' | 'a'): void;

    /**
     * [fn.cp] 复制文件或文件夹
     * @param src  : string
     * @param dist : string
     */
    cp(src: string, dist: string): void;

    /**
     * [fn.mv] 移动文件或文件夹
     * @param src  : string
     * @param dist : string
     */
    mv(src: string, dist: string): void;

    /**
     * [fn.rm] 删除文件或文件夹
     * @param src : string
     */
    rm(src: string): void;

    /**
     * [fn.mk] 创建文件夹
     * @param dir : string
     */
    mk(dir: string): void;

    /**
     * [fn.size] 获取文件的大小
     * @param file   : string
     * @param unit  : 'b'|'kb'|'mb'|'gb'|'tb' = 'kb'
     * @param digit : number = 2
     */
    size(file: string, unit?: 'b' | 'kb' | 'mb' | 'gb' | 'tb', digit?: number): number;

    /**
     * [fn.clear] 命令行清屏
     */
    clear(): void;

    /**
     * [fn.chain] 释放fn变量占用权
     */
    chain(value?: any): any;

    /**
     * [fn.noConflict] 释放fn变量占用权
     */
    noConflict(): void;
  }
}
