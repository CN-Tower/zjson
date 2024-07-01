/* api-list ==
// 项目常量
consts.UTILS_CACHE         // 缓存对象名称
consts.CACHED_STYLES        // 缓存样式名称
consts.CACHED_SCRIPTS       // 缓存脚本名称
consts.ID_CHAR_SET          // ID限定字符
consts.HTML_ESCAPES         // 转义符号列表
consts.HTML_UNESCAPES       // 反转义符号列表
consts.DAY_TIME             // 一天的毫秒数
consts.DAY_TIME_1           // 一天的毫秒数减1
// 正则配置
consts.RE_PHONE             // 正则-手机号码
consts.RE_TEL               // 正则-座机号码
consts.RE_EMAIL             // 正则-邮箱
consts.RE_ZIP_CODE          // 正则-邮政编码
consts.RE_QQ                // 正则-腾讯QQ号
consts.RE_ID_CARD           // 正则-身份证号码
consts.RE_MONTH             // 正则-一年12个月
consts.RE_MONTH_DAY         // 正则-一月的31天
consts.RE_UUID              // 正则-UUID
consts.RE_DB_CHAR           // 正则-双字节字符
consts.RE_CN_CHAR           // 正则-汉字
consts.RE_BASE64            // 正则-Base64
consts.RE_IPV4              // 正则-IPv4地址
consts.RE_DOMAIN            // 正则-域名
consts.RE_PROT              // 正则-端口
consts.RE_URL               // 正则-IP或域名链接
consts.RE_URL_IP            // 正则-IP URL链接
consts.RE_URL_DOMAIN        // 正则-URL域名链接
consts.trimReLimits()       // 去除正则首尾限定符
```
[回到顶部 ↑↑↑](#)
```ts
// 构建版本
b.version                   // 获取Utils构建版本
// 正则判断
b.isPhone()                 // 判断一个变量是不是手机号
b.isEmail()                 // 判断一个变量是不是邮箱地址
b.isIdCard()                // 判断一个变量是不是身份证号码
b.isUrl()                   // 判断一个变量是不是url链接
b.isIpv4()                  // 判断一个变量是不是一个Ipv4地址
b.isCnChar()                // 判断一个变量是不是由汉字组成
b.isDbChar()                // 判断一个变量是不是由双字节字符组成
b.isBase64()                // 判断一个变量是不是base64字符串
// 类型判断
b.isArr()                   // 判断一个变量是否为数组
b.isObj()                   // 判断一个变量是否为对象
b.isFun()                   // 判断一个变量是否为函数
b.isStr()                   // 判断一个变量是否为字符串
b.isBol()                   // 判断一个变量是否为布尔值
b.isNum()                   // 判断一个变量是否为数值
b.isNul()                   // 判断一个变量是否为null
b.isUdf()                   // 判断一个变量是否为undefined
b.isUdfNul()                // 判断一个变量是否为undefined或null
b.toRowType()               // 获取变量toString后去掉中括号和object的值
// 数组对象
b.array()                   // 生成一个指定长度和填充的数组
b.toArray()                 // 任意类型转数组类型
b.tulpeArray()              // 生成一个由参数元组构组成的数组
b.unique()                  // 数组或字符串去重
b.shuffle()                 // 数组或字符串随机排序
b.flatten()                 // 把有结构的数组打散，减少层数
b.includes()                // 判断值是否在数组、字符串或对象的key中
b.findIndex()               // 搜索目标值在数组或字符串中的位置
b.get()                     // 根据路径获取对象属性
b.pick()                    // 选取对象的部分属性创建一个新对象
b.omit()                    // 去除对象的部分属性创建一个新对象
b.deepCopy()                // 深拷贝一个对象或数组
b.isDeepEqual()             // 判断两个对象或数组内容是否相等
b.pretty()                  // 格式化值的输出为字符串模板
// 通用函数
b.debounce()                // 防抖函数，目标函数在一段时间内未调用才能再次调用
b.throttle()                // 节流函数，目标函数在一个时间段之内只能被调用一次
b.randomId()                // 随机生成一个字符串ID
b.randomNum()               // 随机生成一个指定范围的数字
b.randomColor()             // 随机生成一个16进制颜色值
b.getStringHash()           // 获取字符串的哈希值
b.compareVersion()          // 比较两个版本号的大小
b.parseQueryString()        // 获取url中的查询参数
b.parseQs()                 // 获取url中的查询参数，同`parseQueryString()`
b.stringifyQueryString()    // 把对象编译成Url参数
b.stringifyQs()             // 把对象编译成Url参数，同`stringifyQueryString()`
// 格式转换
b.escapeHtml()              // 转义HTML字符
b.encodeHtml()              // 转义HTML字符，同`escapeHtml()`
b.unescapeHtml()            // 反转义HTML字符
b.decodeHtml()              // 反转义HTML字符，同`unescapeHtml()`
b.formatNum()               // 格式化一个数字为万或亿
b.formatMoney()             // 格式化金钱，隔三位以逗号隔开
b.cutString()               // 裁切字符串，超出部分以超出符代替
b.maskString()              // 给字符串指定位置打码
b.capitalize()              // 单词首字母大写
b.outOfNumShowPlus()        // 超出限定数值显示加号
b.trimReLimits()            // 去除正则首尾限定符
// 时间日期
b.CountDown()               // 倒计时类，可用来创建倒计时对象
b.formatToDate()            // 格式化时间参数为日期对象
b.formatDate()              // 格式化时间为给定格式
b.formatDateTime()          // 格式化时间为给定格式，同`formatDate()`
b.formatDuration()          // 把时间段转化为时分秒(hh:mm:ss)格式
b.formatTime()              // 获取事件发生到现在的可读时间
b.formatPassedTime()        // 获取事件发生到现在的可读时间，同`formatTime()`
b.getAgeByBirth()           // 根据出生时间获取生日
b.getAgeByIdCard()          // 根据身份证号获取年龄
b.getDayStartTime()         // 获取一天的开始时间，00点00分00秒时间戳
b.getDayEndTime()           // 获取一天的结束时间，23点59分59秒时间戳
b.getDayOfYear()            // 获取给定时间的日期在当年的第几天
b.getWeekOfYear()           // 获取给定时间的日期在当年的第几个星期
b.getMonthDays()            // 获取某年某月的天数
b.getDaysBetween()          // 获取两个时间之前相差的天数
b.isLeapYear()              // 判断是否为润年
// 数据请求
b.PageParams()              // 分页参数类，创建一个分页对象
b.createHttp()              // 创建一个基于axios的http请求实例
b.toHttps()                 // 强制Url转https协议
b.urlToHttps()              // 强制Url转https协议，同`toHttps()`
b.trimHttp()                // 去除url前面的http或https，由访问地址自动决定
b.urlTrimHttp()             // 去除url前面的http或https，由访问地址自动决定，同`trimHttp()`
b.isSupportWebp()           // 判断是否支持webp
b.formatImg()               // 格式化图片地址（设置宽、高、缩放、裁剪、webp）
b.formatImgSrc()            // 格式化图片地址（设置宽、高、缩放、裁剪、webp），同`formatImg()`
b.onImagesLoad()            // 当给定的一组图片全部加载完成
```
[回到顶部 ↑↑↑](#)
```ts
// 前端存储
b.getCookie()               // 获取Cookie数据
b.setCookie()               // 设置Cookie数据
b.removeCookie()            // 移除Cookie数据
b.getCache()                // 获取缓存数据
b.setCache()                // 设置缓存数据
b.removeCache()             // 移除缓存数据
b.getLocalStorage()         // 获取LocalStorage数据
b.setLocalStorage()         // 设置LocalStorage数据
b.removeLocalStorage()      // 移除LocalStorage数据
b.getSessionStorage()       // 获取SessionStorage数据
b.setSessionStorage()       // 设置SessionStorage数据
b.removeSessionStorage()    // 移除SessionStorage数据
// 设备检测
b.isMobile()                // 根据UA判断是否为移动端设备
b.isDesktop()               // 根据UA判断是否为桌面端
b.isIos()                   // 根据UA判断是否为iOS系统
b.isIPhone()                // 根据UA判断是否为iPhone
b.isIPad()                  // 根据UA判断是否为iPad
b.isAndroid()               // 根据UA判断是否为Android系统
b.isInBrowser()             // 判断是否为浏览器环境
b.isSSR()                   // 判断是否为服务端渲染环境
b.isZhTw()                  // 判断是用否繁体字显示
b.isTouchScreen()           // 判断是否为触摸屏
b.getBrowserInfo()          // 获取当前浏览器信息
b.getPlatformInfo()         // 获取浏览器和平台信息
b.getPerformanceInfo()      // 获取页面性能数据
// 页面功能
b.copyText()                // 复制文本到粘帖板
b.loadScript()              // 动态加载js脚本文件
b.insertScript()            // 动态插入脚本到head中
b.loadCss()                 // 动态加载css文件
b.insertCss()               // 动态插入样式到head中
b.isFullscreen()            // 判断是否处于全屏显示状态
b.requestFullscreen()       // 进入全屏显示
b.exitFullscreen()          // 退出全屏显示
b.scrollTo()                // 滚动到指定位置
b.scrollToTop()             // 滚动到页面顶部
b.scrollToBottom()          // 滚动到页面底部
b.getScrollPosition()       // 获取页面滚动位置
b.getClientSize()           // 获取可视区宽高
b.getPageSize()             // 获取页面宽高
b.getVideoSizeRatio()       // 获取视频的宽高比
b.setToFavorite()           // 把页面加入浏览器收藏夹
b.requestAnimationFrame()   // 获取兼容的动画更新函数
b.getScreenPosition()       // 获取拓展屏相对主屏的位置
b.openWindow()              // 打开一个相对屏幕居中的新窗口
b.onWindowResize()          // 监听窗口变化，H5判断软键盘是否打开
b.offWindowResize()         // 取消监听窗口变化
b.dispatchCustomEvent()     // 触发一个自定义事件
// 页面元素
b.isHTMLElement()           // 判断是否为HTML元素
b.isElementMatch()          // 判断元素是否与选择器匹配
b.getClosestElement()       // 获取离已知元素最近的匹配祖先元素（包括自身）
b.getMatchedWrapElement()   // 获取最近的祖先元素(包括自身)
b.removeElement()           // 彻底移除DOM元素防止内存泄漏
b.removeDomElement()        // 彻底移除DOM元素防止内存泄漏，同`removeElement()`
b.setCursorPosition()       // 设置输入框光标位置或定位光标到未尾
b.hasClass()                // 判断元素是否有某个class类名
b.addClass()                // 给元素增加一个class名
b.removeClass()             // 移除元素的某个class类名
// 文件操作
b.base64ToBlob()            // Base64或dataURI转Blob对象
b.base64ToFile()            // Base64或dataURI转File对象
b.base64ToUnit8Array()      // Base64或dataURI转unit8数组
b.canvasVoidBlur()          // 修复Canvase模糊的问题
b.downloadFile()            // 下载文件到本地，并指定文件名
b.fileOrBlobToBase64()      // File或Blob对象转Base64字符串
b.imageToBase64()           // 图片转Base64字符串
== api-list */

/**
 * Utils常量配置
 */
interface Consts {
  // =======================================================================================
  //                                     常  量  配  置
  // =======================================================================================
  /**
   * 项目常量
   */
  // 缓存对象名称
  UTILS_CACHE: '__utils_cache'
  // 缓存样式名称
  CACHED_STYLES: '__utils_styles'
  // 缓存脚本名称
  CACHED_SCRIPTS: '__utils_scripts'
  /**
   * 符号设定
   */
  // ID限定字符
  ID_CHAR_SET: {
    number: '0123456789'
    letter: 'abcdefghijklmnopqrstuvwxyz'
    special: '~`!@#$%^&*()-_+=[]{};:"\',<.>/?'
  }
  // 转义符号列表
  HTML_ESCAPES: AnyObj
  // 反转义符号列表
  HTML_UNESCAPES: AnyObj
  /**
   * 时间常量
   */
  // 时间-一天的毫秒数：86400000 = 1000 * 60 * 60 * 24
  DAY_TIME: number
  // 时间-一天的毫秒数减一
  DAY_TIME_1: number
  /**
   * 常用正则
   */
  // 正则-手机号码
  RE_PHONE: RegExp
  // 正则-座机号码
  RE_TEL: RegExp
  // 正则-邮箱
  RE_EMAIL: RegExp
  // 正则-邮政编码
  RE_ZIP_CODE: RegExp
  // 正则-腾讯QQ号
  RE_QQ: RegExp
  // 正则-一代身份证号码15位
  RE_ID_CARD_V1: RegExp
  // 正则-二代身份证号码18位
  RE_ID_CARD_V2: RegExp
  // 正则-身份证号码
  RE_ID_CARD: RegExp
  // 正则-一年12个月
  RE_MONTH: RegExp
  // 正则-一月的31天
  RE_MONTH_DAY: RegExp
  // 正则-UUID
  RE_UUID: RegExp
  // 正则-双字节字符
  RE_DB_CHAR: RegExp
  // 正则-汉字
  RE_CN_CHAR: RegExp
  // 正则-Base64
  RE_BASE64: RegExp
  // 正则-IPv4地址
  RE_IPV4: RegExp
  // 正则-域名
  RE_DOMAIN: RegExp
  // 正则-端口
  RE_PROT: RegExp
  // 正则-IP或域名链接
  RE_URL: RegExp
  // 正则-IP URL链接
  RE_URL_IP: RegExp
  // 正则-URL域名链接
  RE_URL_DOMAIN: RegExp
  // 去除正则首尾限定符
  trimReLimits: (ptn: RegExp) => string
}
/**
```
[回到顶部 ↑↑↑](#)
```ts
/* >_< */
/**
 * Utils接口定义
 */
interface IUtils {
  // 常量配置
  consts: Consts
  // 构建版本
  version: `${number}.${number}.${number | string}`
  // =======================================================================================
  //                                     正  则  判  断
  // =======================================================================================
  /**
   * 判断一个变量是不是手机号
   * @param {*} value
   *
   * @example
   * isPhone('13570347570');  // => true
   * isPhone('2471150552');   // => false
   *
   * >_ isPhone(value);
   */
  isPhone(value: any): boolean
  /**
   * 判断一个变量是不是邮箱地址
   * @param {*} value
   *
   * @example
   * isEmail('abc@blabla.com); // => true
   * isEmail('abc.blabla.com); // => false
   *
   * >_ isEmail(value);
   */
  isEmail(value: any): boolean
  /**
   * 判断一个变量是不是身份证号码
   * @param {*} value
   *
   * @example
   * isIdCard('632123820927051');    // => true
   * isIdCard('22082119800801002x'); // => true
   *
   * >_ isIdCard(value);
   */
  isIdCard(value: any): boolean
  /**
   * 判断一个变量是不是url链接
   * @param {*} value
   *
   * @example
   * isUrl('https://www.blabla.com'); // => true
   *
   * >_ isUrl(value);
   */
  isUrl(value: any): boolean
  /**
   * 判断一个变量是不是一个Ipv4地址
   * @param {*} value
   *
   * @example
   * isIpv4('127.0.0.1');  // => true
   * isIpv4('::1/128');    // => false
   *
   * >_ isIpv4(value);
   */
  isIpv4(value: any): boolean
  /**
   * 判断一个变量是不是由汉字组成
   * @param {*} value
   *
   * @example
   * isCnChar('吧啦吧啦');  // => true
   * isCnChar('blabla'); // => false
   *
   * >_ isCnChar(value);
   */
  isCnChar(value: any): boolean
  /**
   * 判断一个变量是不是由双字节字符组成
   * @param {*} value
   *
   * @example
   * isDbChar('吧啦吧啦');  // => true
   * isDbChar('blabla'); // => false
   *
   * >_ isDbChar(value);
   */
  isDbChar(value: any): boolean
  /**
   * 判断一个变量是不是base64字符串
   * @param {*} value
   *
   * @example
   * isBase64('MTIz'); // => true
   * isBase64('123');  // => false
   *
   * >_ isBase64(value);
   */
  isBase64(value: any): boolean
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     类  型  判  断
  // =======================================================================================
  /**
   * 判断一个变量是否为数组
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isArr(value);
   */
  isArr(value: any): value is any[]
  /**
   * 判断一个变量是否为对象
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isObj(value);
   */
  isObj(value: any): value is AnyObj
  /**
   * 判断一个变量是否为函数
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isFun(value);
   */
  isFun(value: any): value is AnyFun
  /**
   * 判断一个变量是否为字符串
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isStr(value);
   */
  isStr(value: any): value is string
  /**
   * 判断一个变量是否为布尔值
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isBol(value);
   */
  isBol(value: any): value is boolean
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
   *
   * >_ isNum(value, isLoose);
   */
  isNum(value: any, isLoose?: boolean): value is number
  /**
   * 判断一个变量是否为null
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isNul(value);
   */
  isNul(value: any): value is null
  /**
   * 判断一个变量是否为undefined
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isUdf(value);
   */
  isUdf(value: any): value is undefined
  /**
   * 判断一个变量是否为undefined或null
   * @param {*} value
   * @returns {boolean}
   *
   * >_ isUdfNul(value);
   */
  isUdfNul(...args: any[]): any
  /**
   * 获取变量toString后去掉中括号和object的值
   * @param {*} value
   * @returns
   *
   * toRowType([]);  // => 'Array'
   * toRowType({});  // => 'Object'
   *
   * >_ toRowType(value);
   */
  toRowType(value: any): string
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     数  组  对  象
  // =======================================================================================
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
   *
   * >_ array(length, value);
   */
  array(length?: number): number[]
  array<T extends (i?: number) => any>(length: number, fillFun: T): ReturnType<T>[]
  array<T>(length: number, value: T): T[]
  /**
   * 任意类型转数组类型
   * @param value
   *
   * @example
   * toArray(123);   // => [ 123 ]
   * toArray([ 123 ]); // => [ 123 ]
   *
   * >_ toArray(value);
   */
  toArray<T>(value: T | T[]): T[]
  /**
   * 生成一个由参数元组构组成的数组
   *
   * @example
   *
   * const colors = tulpeArray('blue', 'pink');  // => ['blue', 'pink']
   * const ColorType = ElementOf<typeof colors>; // => 'blue' | 'pink'
   *
   * >_ tulpeArray();
   */
  tulpeArray<T extends string[] | number[]>(...args: T): T
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
   *
   * >_ unique(value, condition);
   */
  unique<T>(value: T[], props?: Key[]): T[]
  unique<T>(value: T[], isLoose?: boolean): T[]
  unique(value: string): string
  /**
   * 数组或字符串随机排序
   * @param {Array|string} value
   * @returns
   *
   * @example
   * shuffle('abcdefg');             // => 'gcfaebd'
   * shuffle(['a', 'b', 'c', 'd']);  // => ['b', 'a', 'd', 'c']
   *
   * >_ shuffle(value);
   */
  shuffle<T>(value: T[]): T[]
  shuffle(value: string): string
  /**
   * 把有结构的数组打散，减少层数
   * @param array 需要打散的数组
   * @param deep 是否深度打散
   *
   * flatten([1, [2, 3], [4, 5]]);       // => [1, 2, 3, 4, 5]
   * flatten([1, [2, [3, 4]], 5]);       // => [1, 2, [3, 4], 5]
   * flatten([1, [2, [3, 4]], 5], true); // => [1, 2, 3, 4, 5]
   *
   * >_ flatten(array, deep);
   */
  flatten(array: any[], deep?: boolean): any[]
  /**
   * 判断值是否在数组、字符串或对象的key中
   * @param {string|Array|Object} collection
   * @param {*} predicate
   * @returns
   *
   * >_ includes(collection, predicate);
   */
  includes<T>(collection: T[], predicate: ((val: any, idx: number) => boolean) | Any): T[]
  includes(collection: string, predicate: ((val: any, idx: number) => boolean) | Any): string
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
   *
   * >_ findIndex(collection, predicate);
   */
  findIndex<T>(collection: T[], predicate: ((val: any, idx: number) => boolean) | Any): number
  findIndex(collection: string, predicate: ((val: any, idx: number) => boolean) | Any): number
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
   *
   * >_ get(object, path, defaultVal);
   */
  get(object: any, path: string | string[], defaultVal?: any): any
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
   *
   * >_ pick(object, props, isDeep);
   */
  pick<T extends AnyObj>(object: T, props: Key[], isDeep?: boolean): Partial<T>
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
   *
   * >_ omit(object, props, isDeep);
   */
  omit<T extends AnyObj>(object: T, props: Key[], isDeep?: boolean): Partial<T>
  /**
   * 深拷贝一个对象或数组
   * @param {*} object 需要深拷贝的对象
   *
   * const obj = { str: 'string', obj: {}, arr: [] };
   * const obj2 = deepCopy(obj);        // => { str: 'string', obj: {}, arr: [] }
   * console.log(obj === obj2);         // false
   * console.log(obj.obj === obj2.obj); // false
   * console.log(isDeepEqual(obj === obj2)); // true
   *
   * >_ deepCopy(object);
   */
  deepCopy<T>(object: T): T
  /**
   * 判断两个对象或数组内容是否相等
   * @param {*} obj1
   * @param {*} obj2
   * @returns
   *
   * isDeepEqual([1,2], [1,2]); // => true;
   * isDeepEqual({name: 'Tom', age: 18}, {name: 'Tom', age: 20});  // => false
   *
   * >_ isDeepEqual(obj1, obj2);
   */
  isDeepEqual(obj1: any, obj2: any): boolean
  /**
   * 格式化值的输出为字符串模板
   * @param {*} value
   * @returns {string}
   *
   * >_ pretty(value);
   */
  pretty(value: any): string
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     通  用  函  数
  // =======================================================================================
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
   *
   * >_ debounce(func, wait, immediate, lastcall, leakcall);
   */
  debounce<T extends AnyFun>(func: T, wait: number, immediate: boolean, lastcall: boolean): T
  debounce<T extends AnyFun>(func: T, wait: number, immediate: boolean): T
  debounce<T extends AnyFun>(func: T, wait: number): T
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
   *
   * >_ throttle(func, wait, immediate, lastcall);
   */
  throttle<T extends AnyFun>(func: T, wait: number, immediate: boolean, lastcall: boolean): T
  throttle<T extends AnyFun>(func: T, wait: number, immediate: boolean): T
  throttle<T extends AnyFun>(func: T, wait: number): T
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
   *
   * >_ randomId(length, charSet);
   */
  randomId(length?: number, charSet?: string): string
  randomId(charSet: string): string
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
   *
   * >_ randomNum(start, end, isFloat);
   */
  randomNum(start: number, end: number, isFloat?: boolean): number
  randomNum(end: number, isFloat?: boolean): number
  /**
   * 随机生成一个16进制颜色值
   * @returns {string}
   *
   * @example
   * randomColor(); // => '#bb655b'
   *
   * >_ randomColor();
   */
  randomColor(): string
  /**
   * 获取字符串的哈希值
   * @param {string} string
   * @returns
   *
   * >_ getStringHash(string);
   */
  getStringHash(string: string): number
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
   *
   * >_ compareVersion(v1, v2);
   */
  compareVersion(v1: string, v2: string): -1 | 0 | 1
  /**
   * 获取url中的查询参数
   * @param {*} url
   * @returns
   *
   * >_ parseQueryString(url);
   */
  parseQueryString(url: string): AnyObj
  /**
   * 获取url中的查询参数
   * @param {*} url
   * @returns
   *
   * >_ parseQs(url);
   */
  parseQs(url: string): AnyObj
  /**
   * 把对象编译成Url参数
   * @param {Object} data
   *
   * >_ stringifyQueryString(data);
   */
  stringifyQueryString(data: AnyObj): string
  /**
   * 把对象编译成Url参数
   * @param {Object} data
   *
   * >_ stringifyQs(data);
   */
  stringifyQs(data: AnyObj): string
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     格  式  转  换
  // =======================================================================================
  /**
   * 转义HTML字符
   * @param {string} html
   *
   * escapeHtml('<a href="">点我</a>'); // => '&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'
   *
   * >_ escapeHtml(html);
   */
  escapeHtml(html: string): string
  /**
   * 转义HTML字符
   * @param {string} html
   *
   * encodeHtml('<a href="">点我</a>'); // => '&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'
   *
   * >_ encodeHtml(html);
   */
  encodeHtml(html: string): string
  /**
   * 反转义HTML字符
   * @param {string} str
   *
   * unescapeHtml('&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'); // => '<a href="">点我</a>'
   *
   * >_ unescapeHtml(str);
   */
  unescapeHtml(str: string): string
  /**
   * 反转义HTML字符
   * @param {string} str
   *
   * decodeHtml('&lt;a href=&quot;&quot;&gt;点我&lt;/a&gt;'); // => '<a href="">点我</a>'
   *
   * >_ decodeHtml(str);
   */
  decodeHtml(str: string): string
  /**
   * 格式化一个数字为万或亿
   * @param {string|number} num
   * @param {boolean} isZhTw
   * @returns
   *
   * >_ formatNum(num, isZhTw);
   */
  formatNum(num: number | string, isZhTw?: boolean): string
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
   *
   * >_ formatMoney(amount, digit);
   */
  formatMoney(amount: number, digit?: number): string
  /**
   * 裁切字符串，超出部分以超出符代替
   * @param {*} string 原字符串
   * @param {*} length 限定长度
   * @param {*} omission  超出符，默认为：...
   *
   * cutString('测试字符串裁切函数，过长溢出显示省略', 20);                     // => '测试字符串裁切函数，...'
   * cutString('Test cutString function, overflow display omission', 20); // => 'Test cutString fun...'
   *
   * >_ cutString(string, length, omission);
   */
  cutString(string: string, length: number, omission?: string): string
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
   *
   * >_ maskString(string, start, length, mask);
   */
  maskString(string: string, start: number, length: number, mask?: string): string
  maskString(string: string, start: number, mask?: string): string
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
   *
   * >_ capitalize(word);
   */
  capitalize(word: string): string
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
   *
   * >_ outOfNumShowPlus(value, maxNum);
   */
  outOfNumShowPlus(value: number | string, maxNum?: number): string
  /**
   * 去除正则首尾限定符
   * @param {RegExp} ptn
   * @returns {string}
   *
   * >_ trimReLimits(ptn);
   */
  trimReLimits(re: RegExp): string
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     时  间  日  期
  // =======================================================================================
  /**
   * 倒计时类，可用来创建倒计时对象
   * @param {number} time 倒计时时间
   * @param {Object} options 倒计时参数
   * @param {Function} tickCallback 倒计时步进回调
   *
   * @example
   * import { CountDown } from 'utils';
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
   *
   * >_ CountDown(time, options, tickCallback);
   */
  CountDown: typeof CountDown
  /**
   * 格式化时间参数为日期对象
   * @param {Date|number|string} time
   * @returns {Date}
   *
   * formatToDate(new Date);      // => Date
   * formatToDate('2021-10');     // => Date
   * formatToDate(1636222480480); // => Date
   *
   * >_ formatToDate(time);
   */
  formatToDate(time: Date | string | number): Date | null
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
   *
   * >_ formatDate(fmtStr, time);
   */
  formatDate(fmtStr: string, time: Date | string | number): string
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
   * formatDateTime('YYYY-MM-DD hh:mm:ss', Date.now());
   *
   * >_ formatDateTime(fmtStr, time);
   */
  formatDateTime(fmtStr: string, time: Date | string | number): string
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
   *
   * >_ formatDuration(format, duration);
   */
  formatDuration(format: string, duration: number): string
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
   *
   * >_ formatTime(time, timeNames);
   */
  formatTime(
    time: number,
    timeNames?: {
      justNow: string
      minutesAgo: string
      hoursAgo: string
      yesterday: string
      future: string
    }
  ): string
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
   *
   * >_ formatPassedTime(time, timeNames);
   */
  formatPassedTime(
    time: number,
    timeNames?: {
      justNow: string
      minutesAgo: string
      hoursAgo: string
      yesterday: string
      future: string
    }
  ): string
  /**
   * 根据出生时间获取生日
   * @param {Date|number|string} time
   * @returns {number}
   *
   * // 执行时间：2021-11
   * getAgeByBirth(new Date());   // => 0
   * getAgeByBirth('2011-01-01'); // => 10
   * getAgeByBirth(820454400000); // => 25
   *
   * >_ getAgeByBirth(time);
   */
  getAgeByBirth(time: Date | string | number): number
  /**
   * 根据身份证号获取年龄
   * @param {string} cardNb 身份证号码
   *
   * getAgeByIdCard('350424870506202');    // => 34
   * getAgeByIdCard('36232119980910337x'); // => 23
   * getAgeByIdCard('440102198001021230'); // => 41
   *
   * >_ getAgeByIdCard(cardNb);
   */
  getAgeByIdCard(cardNb: string): number
  /**
   * 获取一天的开始时间，00点00分00秒时间戳
   * @param {Date|number|string} time
   * @returns {number}
   *
   * getDayStartTime('2021-10-01'); // => 1633017600000
   *
   * >_ getDayStartTime(time);
   */
  getDayStartTime(time: Date | string | number): number
  /**
   * 获取一天的结束时间，23点59分59秒时间戳
   * @param {Date|number|string} time
   * @returns {number}
   *
   * getDayEndTime('2021-10-01'); // => 1633103999999
   *
   * >_ getDayEndTime(time);
   */
  getDayEndTime(time: Date | string | number): number
  /**
   * 获取给定时间的日期在当年的第几天
   * @param {Date|number|string} time
   * @returns {number}
   *
   * @example
   * getDayOfYear();             // => 返回当前日期在一年中的天数
   * getDayOfYear('2021-10-01'); // => 274
   *
   * >_ getDayOfYear(time);
   */
  getDayOfYear(time: Date | string | number): number
  /**
   * 获取给定时间的日期在当年的第几个星期
   * @param {Date|number|string} time
   * @returns {number}
   *
   * getWeekOfYear('2021-01-01');  // => 1
   * getWeekOfYear('2021-01-03');  // => 1
   * getWeekOfYear('2021-01-04');  // => 2
   *
   * >_ getWeekOfYear(time);
   */
  getWeekOfYear(time: Date | string | number): number
  /**
   * 获取某年某月的天数
   * @param {*} time
   * @returns {number}
   *
   * getMonthDays('2021-2');            // => 28
   * getMonthDays('2021-03');           // => 31
   * getMonthDays(1617235200000);       // => 30
   * getMonthDays(new Date('2021-05')); // => 31
   *
   * >_ getMonthDays(time);
   */
  getMonthDays(time: Date | string | number): number
  /**
   * 获取两个时间之前相差的天数
   * @param {Date|number|string} time1 时间1
   * @param {Date|number|string} time2 时间2，默认当天
   * @returns
   *
   * @example
   * getDaysBetween('2021-01-01', '2021-10-01'); // => 273
   *
   * >_ getDaysBetween(time1, time2);
   */
  getDaysBetween(time1: Date | string | number, time2: Date | string | number): number
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
   *
   * >_ isLeapYear(year);
   */
  isLeapYear(year: number): boolean
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     网  络  请  求
  // =======================================================================================
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
   * import { PageParams } from 'utils';
   *
   * const pageParams = new PageParams(1, 10);
   * // total未赋值时，hasMore为true
   * console.log(pageParams.hasMore); // true;
   *
   * pageParams.pn = 2;
   * pageParams.total = 9;
   * // total赋值后，hasMore将被计算出来
   * console.log(pageParams.hasMore); // false;
   *
   * >_ PageParams(pn, ps);
   */
  PageParams: typeof PageParams
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
   *
   * >_ createHttp(axios, options);
   */
  createHttp: {
    (axios: any, options?: RequestsOptions): HttpInstance
    /**
     * 获取返回结果的data字段
     */
    resToData(res: any): any
    /**
     * 获取返回结果data字段转对象
     */
    resToObj(res: any): AnyObj
    /**
     * 获取返回结果data字段转数组
     */
    resToArr(res: any): Array<any>
    /**
     * 获取返回结果data字段转分页对象
     */
    resToPage(res: any): { total: number; list: any[] }
  }
  /**
   * 强制Url转https协议
   * @param url
   * @returns
   *
   * >_ toHttps(url);
   */
  toHttps(url: string): string
  /**
   * 强制Url转https协议
   * @param url
   * @returns
   *
   * >_ urlToHttps(url);
   */
  urlToHttps(url: string): string
  /**
   * 去除url前面的http或https，由访问地址自动决定
   * @param url
   * @returns
   *
   * >_ trimHttp(url);
   */
  trimHttp(url: string): string
  /**
   * 去除url前面的http或https，由访问地址自动决定
   * @param url
   * @returns
   *
   * >_ urlTrimHttp(url);
   */
  urlTrimHttp(url: string): string
  /**
   * 判断是否支持webp
   *
   * >_ isSupportWebp();
   */
  isSupportWebp(): boolean
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
   *
   * >_ formatImg(url, options);
   */
  formatImg(
    url: string,
    options?: {
      w?: number
      h?: number
      e?: number
      c?: number
      q?: number
      s?: number
      webp?: boolean
    }
  ): string
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
   *
   * >_ formatImgSrc(url, options);
   */
  formatImgSrc(
    url: string,
    options?: {
      w?: number
      h?: number
      e?: number
      c?: number
      q?: number
      s?: number
      webp?: boolean
    }
  ): string
  /**
   * 当给定的一组图片全部加载完成
   * @param {Array<string>} imgUrls
   *
   * >_ onImagesLoad(imgUrls);
   */
  onImagesLoad(imgUrls: string[]): Promise<any>
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     本  地  存  储
  // =======================================================================================
  /**
   * 获取Cookie数据
   * @param {string|true} key Cookie的Key，为true时将返回所有Cookie
   * @param {{ decode?: boolean, template?: string }} options? 可选
   *
   * getCookie(true);         // => { ...cookies }
   * getCookie('cookie_key'); // => *
   *
   * >_ getCookie(key, options);
   */
  getCookie(key: string, options?: { decode?: boolean; template?: string }): any
  getCookie(json: boolean, options?: { decode?: boolean; template?: string }): AnyObj
  /**
   * 设置Cookie数据
   * @param {string} key
   * @param {string} value
   * @param {{ exMinuts?: number; exDays?: number; domain?: string; encode?: boolean}} options
   *
   * setCookie('cookie1', 'hello cookie');
   * // 设置blabla.com域下的cookie
   * setCookie('cookie2', 'hello cookie', { domain: '.blabla.com' });
   *
   * >_ setCookie(key, value, options);
   */
  setCookie(
    key: string,
    value: string,
    options?: { exMinuts?: number; exDays?: number; domain?: string; encode?: boolean }
  ): void
  /**
   * 移除Cookie数据
   * @param {string} key
   * @param {string} domain
   *
   * removeCookie('cookieId');
   * // 移除blabla.com域下的cookie
   * removeCookie('cookieId', '.blabla.com');
   *
   * >_ removeCookie(key, domain);
   */
  removeCookie(key: string, domain?: string): any
  /**
   * 获取缓存数据
   * @param {string} key
   * @returns
   *
   * @example
   * getCache('USER_INFO');
   *
   * >_ getCache(key);
   */
  getCache(key: string): any
  /**
   * 设置缓存数据
   * @param {string} key
   * @param {any} value
   * @returns
   *
   * >_ setCache(key, value);
   */
  setCache(key: string, value: any): any
  /**
   * 移除缓存数据
   * @param {string} key
   *
   * >_ removeCache(key);
   */
  removeCache(key: string): any
  /**
   * 获取LocalStorage数据
   * @param {string} key
   * @returns
   *
   * >_ getLocalStorage(key);
   */
  getLocalStorage(key: string): any
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
   *
   * >_ setLocalStorage(key, value);
   */
  setLocalStorage(key: string, value: any): any
  /**
   * 移除LocalStorage数据
   * @param {string} key
   * @returns
   *
   * >_ removeLocalStorage(key);
   */
  removeLocalStorage(key: string): any
  /**
   * 获取SessionStorage数据
   * @param {string} key
   * @returns
   *
   * >_ getSessionStorage(key);
   */
  getSessionStorage(key: string): any
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
   *
   * >_ setSessionStorage(key, value);
   */
  setSessionStorage(key: string, value: any): any
  /**
   * 移除SessionStorage数据
   * @param {string} key
   * @returns
   *
   * >_ removeSessionStorage(key);
   */
  removeSessionStorage(key: string): any
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     U  A   判  断
  // =======================================================================================
  /**
   * 根据UA判断是否为移动端设备
   *
   * >_ isMobile();
   */
  isMobile(): boolean
  /**
   * 根据UA判断是否为桌面端
   * @returns
   *
   * >_ isDesktop();
   */
  isDesktop(): boolean
  /**
   * 根据UA判断是否为iOS系统
   * @returns
   *
   * >_ isIos();
   */
  isIos(): boolean
  /**
   * 根据UA判断是否为iPhone
   *
   * >_ isIPhone();
   */
  isIPhone(): boolean
  /**
   * 根据UA判断是否为iPad
   *
   * >_ isIPad();
   */
  isIPad(): boolean
  /**
   * 根据UA判断是否为Android系统
   * @returns
   *
   * >_ isAndroid();
   */
  isAndroid(): boolean
  /**
   * 判断是否为浏览器环境
   *
   * >_ isInBrowser();
   */
  isInBrowser(): boolean
  /**
   * 判断是否为浏览器环境，同`isInBrowser`
   *
   * >_ isSSR();
   */
  isSSR(): boolean
  /**
   * 判断是用否繁体字显示
   * @returns {boolean}
   *
   * >_ isZhTw();
   */
  isZhTw(): boolean
  /**
   * 判断是否为触摸屏
   * @returns
   *
   * >_ isTouchScreen();
   */
  isTouchScreen(): boolean
  /**
   * 获取当前浏览器信息
   * @returns
   *
   * >_ getBrowserInfo();
   */
  getBrowserInfo(): BrowserInfo
  /**
   * 获取浏览器和平台信息
   *
   * >_ getPlatformInfo();
   */
  getPlatformInfo(): PlatformInfo
  /**
   * 获取页面性能数据
   * @returns
   *
   * >_ getPerformanceInfo();
   */
  getPerformanceInfo(): PerformanceInfo
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     页  面  功  能
  // =======================================================================================
  /**
   * 复制文本到粘帖板
   * @param {string} text
   * @param {Element} target
   *
   * >_ copyText(text, target);
   */
  copyText(text: string, target?: any): void
  /**
   * 动态加载js脚本文件
   * @param {string} src
   * @param {boolean} reload
   *
   * @example
   * loadScript('https://s1.hdslb.com/bfs/static/laputa-home/client/assets/svgfont.6beb9aeb.js');
   *
   * >_ loadScript(src, reload);
   */
  loadScript(src: string, reload?: boolean): Promise<any>
  /**
   * 动态插入脚本到head中
   * @param {string} script
   * @param {boolean} reload
   *
   * insertScript('console.log("hello utils")');
   *
   * >_ insertScript(script, reload);
   */
  insertScript(script: string, reload?: boolean): Promise<any>
  /**
   * 动态加载css文件
   * @param {string} href
   * @param {boolean} reload
   *
   * @example
   * loadCss('https://s1.hdslb.com/bfs/static/jinkela/long/laputa-css/light.css');
   *
   * >_ loadCss(href, reload);
   */
  loadCss(href: string, reload?: boolean): Promise<any>
  /**
   * 动态插入样式到head中
   * @param {string} css
   * @param {boolean} reload
   *
   * @example
   * insertCss('body { color: blue; }');
   *
   * >_ insertCss(css, reload);
   */
  insertCss(css: string, reload?: boolean): Promise<any>
  /**
   * 判断是否处于全屏显示状态
   * @returns {boolean}
   *
   * >_ isFullscreen();
   */
  isFullscreen(): boolean
  /**
   * 进入全屏显示
   * @param {*} element
   *
   * >_ requestFullscreen(element);
   */
  requestFullscreen(element?: any): void
  /**
   * 退出全屏显示
   *
   * >_ exitFullscreen();
   */
  exitFullscreen(): void
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
   *
   * >_ scrollTo(height, options);
   */
  scrollTo(height: number, options?: ScrollToConfig): void
  /**
   * 滚动到页面顶部
   * @param {Object} options
   *
   * scrollToTop();
   * scrollToTop({ animation: false });
   * scrollToTop({ element: document.querySelector('#container') });
   *
   * >_ scrollToTop(options);
   */
  scrollToTop(options?: ScrollToConfig): void
  /**
   * 滚动到页面底部
   * @param {Object} options
   *
   * scrollToBottom();
   * scrollToBottom({ animation: false });
   * scrollToBottom({ element: document.querySelector('#container') });
   *
   * >_ scrollToBottom(options);
   */
  scrollToBottom(options?: ScrollToConfig): void
  /**
   * 获取页面滚动位置
   * @param {HTMLElement} element
   * @returns {{scrollLeft: number, scrollTop: number}}
   *
   * >_ getScrollPosition(element);
   */
  getScrollPosition(element?: any): { scrollLeft: number; scrollTop: number }
  /**
   * 获取可视区宽高
   * @returns {{clientWidth: number, clientHeight: number}}
   *
   * @example
   * const { clientWidth, clientHeight } = getClientSize();
   *
   * >_ getClientSize();
   */
  getClientSize(): { clientWidth: number; clientHeight: number }
  /**
   * 获取页面宽高
   * @returns {{pageWidth: number, pageHeight: number}}
   *
   * >_ getPageSize();
   */
  getPageSize(): { pageWidth: number; pageHeight: number }
  /**
   * 获取视频的宽高比
   * @param {*} videoFile 视频文件
   *
   * >_ getVideoSizeRatio(videoFile);
   */
  getVideoSizeRatio(videoFile: File): number
  /**
   * 把页面加入浏览器收藏夹
   * @param {string} url
   * @param {string} title
   * @returns
   *
   * >_ setToFavorite(url, title);
   */
  setToFavorite(url?: string, title?: string): any
  /**
   * 获取兼容的动画更新函数
   *
   * >_ requestAnimationFrame(callback);
   */
  requestAnimationFrame(callback: AnyFun): any
  /**
   * 获取拓展屏相对主屏的位置
   * @returns {{screenLeft: number, screenTop: number}}
   *
   * @example
   * const {screenLeft, screenTop} = getScreenPosition();
   *
   * >_ getScreenPosition();
   */
  getScreenPosition(): { screenLeft: number; screenTop: number }
  /**
   * 打开一个相对屏幕居中的新窗口
   * @param {*} url
   * @param {*} options
   *
   * @example
   * openWindow('https://www.blabla.com', '吧啦吧啦', 1200, 760);
   *
   * >_ openWindow(url, options);
   */
  openWindow(url: string, options?: OpenWindowOptions): any
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
   *
   * >_ onWindowResize(callback, immediate);
   */
  onWindowResize(
    callback: (resizeInfo: ResizeInfo) => any,
    immediate?: boolean
  ): AnyFun & { off: () => void }
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
   *
   * >_ offWindowResize(handler);
   */
  offWindowResize(handler: AnyFun): void
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
   *
   * >_ dispatchCustomEvent(eName, detail, target);
   */
  dispatchCustomEvent(eName: string, detail?: any, target?: any): boolean
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     页  面  元  素
  // =======================================================================================
  /**
   * 判断是否为HTML元素
   * @param {*} element
   * @returns {boolean}
   *
   * >_ isHTMLElement(element);
   */
  isHTMLElement(element: any): boolean
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
   *
   * >_ isElementMatch(element, selector);
   */
  isElementMatch(element: any, selector: string): boolean
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
   *
   * >_ getClosestElement(element, selector, context);
   */
  getClosestElement(element: any, selector: string, context?: any): Element | null
  /**
   * 获取最近的祖先元素(包括自身)
   * @param element {Element}
   * @param selector {String}
   * @param context {Element=}
   *
   * @alias getClosestElement
   *
   * >_ getMatchedWrapElement(element, selector, context);
   */
  getMatchedWrapElement(element: any, selector: string, context?: any): Element | null
  /**
   * 彻底移除DOM元素防止内存泄漏
   * @param element {Node}
   *
   * >_ removeElement(element);
   */
  removeElement(...args: any[]): any
  /**
   * 彻底移除DOM元素防止内存泄漏
   * @param element {Node}
   *
   * >_ removeDomElement(element);
   */
  removeDomElement(element: any): any
  /**
   * 设置输入框光标位置或定位光标到未尾
   * @param {Element} element 元素
   * @param {number} position 位置，不传默认到未尾
   *
   * @example
   * <input onfocus="setCursorPosition(e.target)" />
   *
   * >_ setCursorPosition(element, position);
   */
  setCursorPosition(element: any, position?: number): void
  /**
   * 判断元素是否有某个class类名
   * @param element HTML元素
   * @param className 类名
   *
   * @example
   * hasClass(someEl, 'hide')
   *
   * >_ hasClass(element, className);
   */
  hasClass(element: any, className: string): boolean
  /**
   * 给元素增加一个class名
   * @param element HTML元素
   * @param className 类名
   *
   * @example
   * addClass(someEl, 'hide')
   *
   * >_ addClass(element, className);
   */
  addClass(element: any, className: string): void
  /**
   * 移除元素的某个class类名
   * @param element HTML元素
   * @param className 类名
   *
   * @example
   * removeClass(someEl, 'hide')
   *
   * >_ removeClass(element, className);
   */
  removeClass(element: any, className: string): void
  /**
```
[回到顶部 ↑↑↑](#)
```ts
  /* >_< */
  // =======================================================================================
  //                                     文  件  操  作
  // =======================================================================================
  /**
   * Base64或dataURI转Blob对象
   * @param {*} base64 Base64或dataURI数据
   * @param {*} mimeType 文件类型
   * @returns {Blob}
   *
   * >_ base64ToBlob(base64, mimeType);
   */
  base64ToBlob(base64: string, mimeType?: string): any
  /**
   * Base64或dataURI转File对象
   * @param {*} base64 Base64或dataURI数据
   * @param {*} fileName 文件名称
   * @param {*} mimeType 文件类型
   * @returns {File}
   *
   * >_ base64ToFile(base64, fileName, mimeType);
   */
  base64ToFile(base64: string, fileName: string, mimeType?: string): any
  /**
   * Base64或dataURI转unit8数组
   * @param {*} base64 Base64或dataURI数据
   * @returns {Uint8Array}
   *
   * >_ base64ToUnit8Array(base64);
   */
  base64ToUnit8Array(base64: string): Uint8Array
  /**
   * 修复Canvase模糊的问题
   * @param {*} canvas
   * @param {*} context
   * @param {number} width  // canvas实际宽度
   * @param {number} height // canvas实际高度
   *
   * >_ canvasVoidBlur(canvas, context, width, height);
   */
  canvasVoidBlur(canvas: any, context: any, width: number, height: number): void
  /**
   * 下载文件到本地，并指定文件名
   * @param {File|Blob|string} source Base64或dataURI数据
   * @param {*} fileName 下载文件名
   *
   * >_ downloadFile(source, fileName);
   */
  downloadFile(source: File | Blob | string, fileName: string): void
  /**
   * File或Blob对象转Base64字符串
   * @param {*} fileOrBlob File或Blob对象
   * @returns {Promise<string>}
   *
   * >_ fileOrBlobToBase64(fileOrBlob);
   */
  fileOrBlobToBase64(fileOrBlob: File | Blob): string
  /**
   * 图片转Base64字符串
   * @param {*} image
   * @returns
   *
   * >_ imageToBase64(image);
   */
  imageToBase64(image: File): string
  /**
   * 其它未列出方法
   */
  [method: string]: any
}
/**
```
[回到顶部 ↑↑↑](#)
```ts
/* >_< */
/**
 * Any类型
 */
type Any = any

/**
 * Key类型
 */
type Key = string | number

/**
 * String 或 Number类型
 */
type StrOrNum = string | number

/**
 * 对象类型
 */
type AnyObj = Record<Key, any>

/**
 * 任意函数类型
 */
type AnyFun = (...args: any[]) => any
/**
 * 倒计时时间
 */
type CountDownTime = number | null | undefined
/**
 * 倒计时参数
 */
interface CountDownOptions {
  // 倒计时步进间隔，默认: 1000
  interval?: number
  // 是否自动开启，默认为: true
  autoStart?: boolean
  // 倒计时类型，d: 到天，h: 到小时，m: 到分钟，s: 到秒，S: 到毫秒，默认：'h'.
  cdType?: 'd' | 'h' | 'm' | 's' | 'S'
}
/**
 * 倒计时类定义
 */
declare class CountDown {
  time: number | null // 倒计时时间
  options: CountDownOptions // 初始化的参数
  initTime: number | null // 初始化的时间
  restTime: number // 剩余时间
  interval: number // 定时间隔
  autoStart: boolean // 是否自动启动
  cdType: 'd' | 'h' | 'm' | 's' // 倒计时类型
  running: boolean // 是否运行中
  destoryed: boolean // 是否已销毁
  completed: boolean // 是否已结束
  tickTimes: number // 步进次数
  restDays: number | null // 剩余天数
  restHours: number | null // 剩余小时
  restMinuts: number | null // 剩余分钟
  restSeconds: number | null // 剩余秒数
  restMilliSeconds: number | null // 剩余毫秒数
  d: number | null // 天数
  h: number | null // 小时
  m: number | null // 分钟
  s: number | null // 秒数
  S: number | null // 毫秒数
  dd: string // 至少两位天数，'--'
  hh: string // 至少两位小时，'--'
  mm: string // 至少两位分钟，'--'
  ss: string // 至少两位秒数，'--'
  SSS: string // 至少三位毫秒数，'---'
  ms: string // 分秒，'-:-'
  hms: string // 时分秒，'-:-:-'
  mmss: string // 分钟秒数：'--:--'
  hhmmss: string // 小时分钟秒数：'--:--:--'
  timerId: any // 定时器ID
  start: () => void // 开启倒计时
  stop: () => void // 停止倒计时
  destory: () => void // 销毁倒计时
  onTick?: (cd: CountDown) => any; // 自定义步进处理函数
  [prop: string]: any // 其它属性

  constructor(tickHandler?: (cd: CountDown) => any)
  constructor(time: CountDownTime, tickHandler?: (cd: CountDown) => any)
  constructor(time: CountDownTime, options: CountDownOptions, tickHandler?: (cd: CountDown) => any)
}
/**
```
[回到顶部 ↑↑↑](#)
```ts
/* >_< */
/**
 * 浏览器信息和版本
 */
interface BrowserInfo {
  isIe: boolean // IE流利器
  isEdge: boolean // 微软浏览器
  isFirefox: boolean // 火狐浏览器
  isOpera: boolean // 欧朋浏览器
  isSafari: boolean // 苹果浏览器
  isChrome: boolean // 谷歌浏览器
  other: boolean // 其它浏览器
  version: string // 版本号
}
/**
 * 运行平台信息
 */
interface PlatformInfo {
  isMobile: boolean // 是否为移动终端
  isIos: boolean // ios终端
  isAndroid: boolean // android终端或者uc浏览器
  isIPad: boolean // 是否iPad
  isIPhone: boolean // 是否为iPhone或者QQHD浏览器
  isWindowsPhone: boolean // Windows Phone
  isTrident: boolean // IE内核
  isPresto: boolean // opera内核
  isWebKit: boolean // 苹果、谷歌内核
  isGecko: boolean // 火狐内核
  isMicroMessenger: boolean // 是否为微信
  isWebApp: boolean // 是否web应该程序，没有头部与底部
  isWeibo: boolean // 微博浏览器
  isUC: boolean // UC浏览器
  isQQ: boolean // QQ浏览器
  isBaidu: boolean // 百度浏览器
  isIE: boolean // IE浏览器
  isIE11: boolean // IE11浏览器
  isFirefox: boolean // 火狐浏览器
  isOpera: boolean // 欧朋浏览器
  isEdge: boolean // Edge浏览器
  isChrome: boolean // Chrome浏览器
  isSafari: boolean // Safari浏览器
}
/**
 * 页面滚动参数
 */
interface ScrollToConfig {
  element?: any // 滚动元素
  animation?: boolean // 是否动画，默认true
  speed?: number // 步进除数[1-10]，越小越快
  onDone?: Function // 步进除数[1-10]，越小越快
}
/**
 * wbi encode config
 */
interface WbiConfig {
  useAssignKey?: boolean
  addSelf?: boolean
  wbiImgKey: string
  wbiSubKey: string
}
/**
 * 页面性能数据
 */
interface PerformanceInfo {
  dnsTime: number // DNS解析时间
  tcpTime: number // TCP连接时间
  reqTime: number // 请求响应时间
  domTime: number // DOM生成时间
  whiteTime: number // 白屏时间
  domreadyTime: number // DOM渲染完成时间
  onloadTime: number // 加载时间
  jsHeapRatio: number // js内存占比
}
/**
 * 分页参数实例
 */
declare class PageParams {
  pn: number // 页码数
  ps: number // 一页限制数
  pageNum: number // 页码娄，值与pn一样
  pageSize: number // 一页限制数，值与ps一样
  total: number // 当前已加载总数
  hasMore: boolean // 是否没有未加载完全

  constructor(pn?: number, ps?: number)
}
/**
```
[回到顶部 ↑↑↑](#)
```ts
/* >_< */
/**
 * 始始化Http请求参数
 */
interface RequestsOptions extends Any {
  /**
   * 成功的code，默认：[0]
   */
  resOkCodes?: number[]
  /**
   * 是否判断`res.code === 0`为成功，默认为 true
   */
  handleResCode?: boolean
  /**
   * 请求拦截器
   */
  reqInterceptor?(conf: any): any
  reqErrInterceptor?(err: any): any
  /**
   * 返回拦截器
   */
  resInterceptor?(res: any): any
  resErrInterceptor?(err: any): any
  /**
   * Get请求处理
   */
  getHandler?(http: any, url: string, opts?: AnyObj): Promise<any>
  /**
   * Post请求处理
   */
  postHandler?(http: any, url: string, data: any, opts?: AnyObj): Promise<any>
  /**
   * 获取Csrf函数，默认从cookie中取
   */
  getCsrf?(): string
}
/**
 * Http请求实例
 */
interface HttpInstance {
  /**
   * Get请求
   */
  get(url: string, options?: AnyObj): Promise<any>
  /**
   * Post请求
   */
  post(url: string, data: any, options?: AnyObj): Promise<any>
  /**
   * Put请求
   */
  put(url: string, data: any, options?: AnyObj): Promise<any>
  /**
   * Delete请求
   */
  delete(url: string, options?: AnyObj): Promise<any>
  /**
   * Patch请求
   */
  patch(url: string, data: any, options?: AnyObj): Promise<any>
  /**
   * Request请求
   */
  request(options: AnyObj): Promise<any>
  /**
   * 获取返回结果的data字段
   */
  resToData(res: any): any
  /**
   * 获取返回结果data字段转对象
   */
  resToObj(res: any): AnyObj
  /**
   * 获取返回结果data字段转数组
   */
  resToArr(res: any): Array<any>
  /**
   * 获取返回结果data字段转分页对象
   */
  resToPage(res: any): { total: number; list: any[] }
}
/**
```
[回到顶部 ↑↑↑](#)
```ts
/* >_< */
/**
 * 打开新窗口参数
 */
interface OpenWindowOptions {
  width?: number
  height?: number
  top?: number
  left?: number
  windowName?: string
}
/**
 * 视口大小信息
 */
interface ResizeInfo {
  isUp: boolean
  isDown: boolean
  isShowKeyboard: boolean
  width: number
  height: number
  prevWidth: number
  prevHeight: number
  originWidth: number
  originHeight: number
}

declare const u: IUtils
export = u
