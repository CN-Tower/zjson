# funclib.js
[![npm](https://img.shields.io/npm/v/funclib.svg)
![LICENSE MIT](https://img.shields.io/npm/l/funclib.svg)](https://www.npmjs.com/package/funclib) 
[![Build Status](https://travis-ci.org/CN-Tower/funclib.js.svg?branch=master)](https://travis-ci.org/CN-Tower/funclib.js)
[![Coverage Status](https://coveralls.io/repos/github/CN-Tower/funclib.js/badge.svg)](https://coveralls.io/github/CN-Tower/funclib.js)

Language 语言: English | [简体中文](https://github.com/CN-Tower/funclib.js)

## 1 Brief Intro
A practical and powerful JavaScript library!

> Funclib: Let you complete the business code efficiently and elegantly!

### Documents:&nbsp;&nbsp;https://www.funclib.net

## 2 Quick Start

### 2.1 Install funclib
yarn: `$ yarn add funclib`<br>
npm: `$ npm install funclib`<br>

### 2.2 Install in miniprogram
yarn: `$ yarn add funclib-mp`<br>
npm: `$ npm install funclib-mp`<br>

### 2.3 Use funclib in JavaScript
```js
var fn = require('funclib');
// In miniprogram: var fn = require('funclib-mp');

var ps = [{name: 'Tom', age: 18}, {name: 'Bob', age: 22}];
fn.log(ps, 'Persons');
```
Output:
```bash
// =>
==================================================================
                       [10:33:55] Persons 
------------------------------------------------------------------
[
  {
    "name": "Tom",
    "age": 18
  },
  {
    "name": "Bob",
    "age": 22
  }
]
==================================================================

> // var bob = fn.find(ps, function(p) { return p.name === 'Bob'; });
> // var bob = fn.find(ps, {name: 'Bob'});
> var p = fn(ps).find({name: 'Bob'}).set('name', 'Lee').val();
> fn.log(p, 'Person');
// =>
==================================================================
                       [10:33:55] Person
------------------------------------------------------------------
{
  "name": "Lee",
  "age": 22
}
==================================================================
```

## 3 Clone Repo
```bash
# Download funclib repo
$ git clone https://github.com/CN-Tower/funclib.js.git

# Install dependency
$ npm install

# Start
$ npm start

# Do Try
$ npm run usage

# Build
$ npm run build

# Test
$ npm run test
```

## 4 Lib Methods
```
==================================================================
* [c]: Client side method 客户端方法
* [s]: Server side method 服务端方法
* [-]: Common method      服务端和客户端通用的方法
------------------------------------------------------------------
 ## Type
 * fn.typeOf                [-] 检查值的类型
 * fn.typeVal               [-] 获取期望类型的值
 * fn.isStr                 [-] 判断类型是否为：string
 * fn.isNum                 [-] 判断类型是否为：number
 * fn.isBol                 [-] 判断类型是否为：boolean
 * fn.isFun                 [-] 判断类型是否为：function
 * fn.isNul                 [-] 判断是否为：null
 * fn.isUdf                 [-] 判断类型是否为：undefined
 * fn.isErr                 [-] 判断类型是否为：Error
 * fn.isDat                 [-] 判断类型是否为：Date
 * fn.isReg                 [-] 判断类型是否为：RegExp
 * fn.isArr                 [-] 判断类型是否为：Array
 * fn.isObj                 [-] 判断是否为：正常Object
 ## Array
 * fn.array                 [-] 返回指定长度和默认值的数组
 * fn.range                 [-] 返回一个范围数组
 * fn.toArr                 [-] 值数组化
 * fn.indexOf               [-] 寻找值在数组中的索引
 * fn.find                  [-] 根据条件寻找值
 * fn.filter                [-] 根据条件取过滤值
 * fn.reject                [-] 根据条件过滤值
 * fn.contains              [-] 判断数组是否包含符合条件的值
 * fn.drop                  [-] 去掉空数组空对象及布尔化后为false的值
 * fn.flatten               [-] 把有结构的数组打散，减少层数
 * fn.pluck                 [-] 把结构中的字段取出合并到一个数组中
 * fn.uniq                  [-] 去重或根据字段去重
 * fn.each                  [-] 遍历数组或类数组, 同: fn.forEach
 * fn.forEach               [-] 遍历数组或类数组
 * fn.sortBy                [-] 返回对象数组根据字段排序后的副本
 ## Object
 * fn.len                   [-] 获取对象自有属性的个数
 * fn.has                   [-] 判断对象是否存在某自有属性
 * fn.get                   [-] 返回对象或子孙对象的属性，可判断类型
 * fn.set                   [-] 设置对象或子孙对象的属性
 * fn.keys                  [-] 返回对象的键值数组
 * fn.pick                  [-] 获取包含部分属性的对象副本
 * fn.omit                  [-] 获取省略部分属性的对象副本
 * fn.extend                [-] 给对象赋值，可指定字段
 * fn.forIn                 [-] 遍历对象的可数自有属性
 * fn.deepCopy              [-] 深拷贝数组或对象
 * fn.isEmpty               [-] 判断对象是否为空对象或数组
 * fn.isDeepEqual           [-] 判断数组或对象是否相等
 ## Math
 * fn.random                [-] 返回指定范围的随机数
 * fn.randomId                   [-] 返回指定长度的随机ID
 * fn.randomColor                [-] 返回一个随机色值
 ## Time
 * fn.interval              [-] 循环定时器
 * fn.timeout               [-] 延时定时器
 * fn.defer                 [-] 延迟执行函数
 * fn.time                  [-] 返回一个时间戳, 同：fn.timestamp
 * fn.timestamp             [-] 返回一个时间戳
 * fn.asUtcTime             [-] 转化为相同时间的UTC时间戳
 * fn.asXyzTime             [-] 转化为相同时间指定时差的时间戳
 * fn.fmtDate               [-] 获取格式化的时间字符串
 * fn.fmtUtcDate            [-] 获取格式化的UTC时间字符串
 * fn.fmtXyzDate            [-] 获取格式化指定时差的时间字符串
 ## String
 * fn.match                 [-] 字符串匹配
 * fn.pretty                [-] 转换成格式化字符串
 * fn.escape                [-] 编码HTML字符串
 * fn.unescape              [-] 解码HTML字符串
 * fn.capitalize            [-] 字符串首字母大写
 * fn.fmtCurrency           [-] 格式化显示货币
 * fn.maskString            [-] 编码字符串或其子串
 * fn.cutString             [-] 裁切字符串到指定长度
 * fn.parseQueryStr         [-] 解析Url参数成对象
 * fn.stringifyQueryStr     [-] 把对象编译成Url参数
 ## RegExp
 * fn.setPattern            [-] 设置一个正则表达式
 * fn.getPattern            [-] 获取一个通用的正则表达式
 * fn.testPattern           [-] 用一个或几个通用正则测试
 * fn.matchPattern          [-] 与一个或几个通用正则匹配
 ## Function
 * fn.rest                  [-] 获取函数的剩余参数
 * fn.throttle              [-] 节流函数
 * fn.debounce              [-] 防抖函数
 ## Loger
 * fn.chalk                 [s] 返回带颜色的字符串
 * fn.print              [c][s] 在控制台打印值
 * fn.log                [c][s] 在控制台打印格式化的值
 ## Tools
 * fn.rd                    [s] 读文件
 * fn.wt                    [s] 写文件
 * fn.cp                    [s] 复制文件夹和文件
 * fn.mv                    [s] 移动文件夹和文件
 * fn.rm                    [s] 删除文件夹和文件
 * fn.mk                    [s] 创建文件夹
 * fn.size                  [s] 获取文件的大小
 * fn.clear                 [s] 控制台清屏
 * fn.copyText              [c] 复制文本到粘贴板
 ## Progress
 * fn.progress              [s] 进度显示工具
 * fn.progress.stop         [s] 停止进度，结束后触发回调
 ## Tricks
 * fn.chain                 [-] 返回链接调用对象
 * fn().method              [-] 返回链接调用对象
 * fn.noConflict            [-] 释放fn变量占用权
 * fn.version               [-] 返回当前函数库版本
==================================================================
```

## 5 Proj Structure
```
funclib.js
├── node_modules/           ### You know the drill...
├── script                  ### 脚本
│   ├── build.js            # 构建脚本
│   ├── karma.conf.js       # Karma测试框架配置
│   ├── pre-build.js        # 构建配置脚本
│   └── test.js             # 测试配置脚本
├── src                     ### Source code
│   ├── funclib/            # 库的函数
│   ├── funclib.core.js     # 通用版
│   ├── funclib.js          # 未压缩版客户端版
│   ├── funclib.min.js      # 压缩版客户端版
│   ├── index.d.ts          # 定义文件
│   ├── index.js            # 服务端版
│   ├── package.json        # 库模块定义
│   └── README.md           # Read this FIRST :)
├── test                    ### 测试
│   ├── client-methods/     # 客户端版测试用例
│   ├── core-methods/       # 通用版测试用例
│   ├── server-methods/     # 服务端版测试用例
│   ├── fn-core.js          # 通用版测试文件
│   └── fn-index.js         # 服务端版测试文件
├── .coveralls.yml          # 测试覆盖率
├── .editorconfig           # Set coding style (indents, charset, etc.)
├── .gitignore              # You know the drill...
├── .travis.yml             # CI配置
├── LICENSE                 # 授权说明
├── package-lock.json       # NPM Lock
├── package.json            # 库配置
├── README.md               # Read this FIRST :)
├── tsconfig.json           # Typescript配置
├── usage.html              # 客户端试验
└── usage.js                # 服务端试验
```
