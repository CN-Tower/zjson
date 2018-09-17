# 转杰森 | ZJSON
> 全力打造最好用的json格式化工具，欢迎一起来玩！

### 访问地址
- 地址: http://zjson.net
- QQ群: 174136590

<p align="center">
  <img width="100%" src="zjson.png">
</p>

### 简单介绍

转杰森是使用Angular6+Typescript+Bootstrap3开发的一个在线Json格式化工具，功能强大、界面美观，有很多高级特性：

- 支持错误的json解析及错误行号和错误类型提示；
- 支持python unicode集合的解析；
- 支持保存、删除和呈现格式化的历史；
- 支持格式化后的json以文件的形式下载；
- 支持中英文双语国际化；
- 支持线上json分享；
- 支持多种皮肤切换；
- 支持JSON转义、压缩；
- 支持JSON标准化析；
- 支持JSON对比；
- 还有更多的功能、配置、特性等你去发现！

相比其它在线格式化工具，如：bejson.com和json.cn等，转杰森界面更加专业、功能更加实用，绝对是开发和测试的好工具。

欢迎各位大虾一起来玩，也欢迎使用、提需求和提BUG。

### 一起来玩
```
# 1、下载代码
$ git clone http://github.com/CN-Tower/zjson.git         # Github
$ git clone http://gitlab.zte.com.cn/CN-Tower/zjson.git  # Gitlab

# 2、安装或解压node_modules
$ cd zjson/client
$ npm install

# 3、Start
$ npm start

# 4、Build
$ npm run update
```

### 项目结构
```
zjson
├── client                              # 前端
│   ├── node_modules/                   # 前端依赖包
│   ├── src                             # 源
│   │   ├── app                         # 前端源
│   │   │   ├── animations              # 动画
│   │   │   │   └── toggle-slid.ts      # 滑动动画
│   │   │   ├── formatter               # 格式化
│   │   │   │   ├── formatter.conf.ts   # 格式化配置
│   │   │   │   ├── formatter.help.ts   # 格式化帮助
│   │   │   │   └── formatter.main.ts   # 格式化主文件
│   │   │   ├── app.component.html      # 转杰森页面
│   │   │   ├── app.component.less      # 转杰森样式
│   │   │   ├── app.component.ts        # 转杰森组件
│   │   │   ├── app.component.spec.ts   # 转杰森测试用例
│   │   │   ├── app.modules.ts          # 转杰森模块
│   │   │   └── app.service.ts          # 转杰森服务
│   │   ├── assets                      # 静态资源
│   │   │   ├── css                     # 样式
│   │   │   │   ├── animate.css         # animate样式库
│   │   │   │   ├── loading.css         # 加载页面样式
│   │   │   │   └── themes.less         # 代码主题
│   │   │   ├── i18n                    # 国际化
│   │   │   │   ├── en.json             # 英文
│   │   │   │   └── zh.json             # 中文
│   │   │   ├── img/                    # 图片
│   │   │   └── lib                     # 依赖库
│   │   │       └── FileSaver.js        # 下载插件
│   │   ├── favicon.ico                 # 图标
│   │   ├── index.html                  # 主页面
│   │   ├── main.ts                     # 入口文件
│   │   ├── styles.css                  # 全局样式
│   │   ├── typings.d.ts                # 全局变量
│   │   └── ...                         # 其它
│   ├── tools                           # 工具
│   │   └── update-zjson.js             # 发布
│   ├── package.json                    # 前端依赖
│   ├── angular.json                    # Angular-cli配置文件
│   ├── proxy.conf.json                 # 代理配置文件
│   ├── README.md                       # 说明文档
│   └── ...                             # 其它
├── server                              # 后端
│   ├── node_modules/                   # 后端依赖包
│   ├── views/                          # Jade视图
│   ├── zjson/                          # 转杰森静态文件
│   ├── bin                             # 运行
│   │   └── www                         # 运行文件
│   ├── routes                          # 路由
│   │   ├── api.js                      # 接口
│   │   └── index.js                    # 索引
│   ├── work                            # 工作目录
│   │   └── visits-count.work.js        # 访问计数
│   ├── app.js                          # 服务器
│   └── package.json                    # 后端依赖
├── .editorconfig                       # Set coding style (indents, charset, etc.)
├── .gitignore                          # You know the drill...
├── Dockerfile                          # Dockerfile
├── nginx.conf                          # nginx配置
├── zjson.sh                            # Docker辅助
├── README.md                           # 说明文档
└── ...                                 # 其它
```
