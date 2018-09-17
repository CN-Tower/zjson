# 转杰森 | ZJSON
> 全力打造最好用的json格式化工具，欢迎一起来玩！

### 访问地址
- 公网地址: http://zjson.net
- 内网地址: http://10.63.244.252:8888
- GitHub: &nbsp;&nbsp;http://github.com/CN-Tower/zjson
- QQ群: &nbsp;&nbsp;&nbsp;&nbsp;174136590

#### 主页界面
![](/upload/file/20180917/1537167176255_.jpg)
#### 对比界面
![](/upload/file/20180917/1537167188033_.jpg)

### 简单介绍

转杰森是使用Angular6 + Typescript + ngx-bootstrap + monaco-editor开发的一个在线Json格式化工具，功能丰富强大、界面简洁美观，还有很多高级特性：

- 支持错误的json解析及错误行号和错误类型提示；
- 支持python unicode集合的解析；
- 支持保存、删除和呈现格式化的历史；
- 支持格式化后的json以文件的形式下载；
- 支持中英文双语国际化；
- 支持线上json分享；
- 支持多种皮肤切换；
- 支持JSON转义、压缩；
- 支持JSON标准化析，把非标准JSON（如：js的object）转化为标准JSON格式；
- 支持JSON对比（有与原码对比、与历史比对和与新建代码对比三种模式）；
- 还有更多的功能、配置、特性等你去发现！

相比其它在线格式化工具，如：bejson.com和json.cn等，转杰森界面更加专业、功能更加实用，绝对是开发和测试的好工具。

欢迎各位大虾一起来玩，Start、Fork或提Issue都是极好的！

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
├── client                              
│   ├── node_modules/                   
│   ├── src                             
│   │   ├── app                         
│   │   │   ├── app-config
│   │   │   │   ├── config-items
│   │   │   │   │   ├── config-indent.component.ts
│   │   │   │   │   ├── config-indent.component.ts
│   │   │   │   │   ├── config-indent.component.ts
│   │   │   │   │   └── config-indent.component.ts
│   │   │   │   ├── app-config.component.html
│   │   │   │   ├── app-config.component.less
│   │   │   │   ├── app-config.component.ts
│   │   │   │   └── index.ts
│   │   │   ├── attachments
│   │   │   │   ├── index.ts
│   │   │   │   ├── zjs-attachment.ts
│   │   │   │   ├── zjs-hint.component.ts
│   │   │   │   ├── zjs-hist.component.ts
│   │   │   │   ├── zjs-info.component.ts
│   │   │   │   ├── zjs-loading.component.ts
│   │   │   │   ├── zjs-notice.component.ts
│   │   │   │   ├── zjs-title.component.ts
│   │   │   │   └── zjs-update.component.ts
│   │   │   ├── formatter
│   │   │   │   ├── index.ts          
│   │   │   │   ├── formatter.conf.ts
│   │   │   │   ├── formatter.core.ts
│   │   │   │   └── formatter.help.ts
│   │   │   ├── monaco-editor        
│   │   │   │   ├── index.ts
│   │   │   │   ├── monaco-editor.base.ts
│   │   │   │   └── monaco-editor.component.ts
│   │   │   ├── shared
│   │   │   │   ├── index.ts
│   │   │   │   ├── shared-broadcast.service.ts
│   │   │   │   ├── shared-interface.ts
│   │   │   │   ├── shared-style.less
│   │   │   │   └── theme.less
│   │   │   ├── app.component.class  
│   │   │   ├── app.component.html   
│   │   │   ├── app.component.less   
│   │   │   ├── app.component.ts     
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.modules.ts       
│   │   │   └── app.service.ts       
│   │   ├── assets                  
│   │   │   ├── css                 
│   │   │   │   ├── animate.css     
│   │   │   │   └── loading.css     
│   │   │   ├── i18n                
│   │   │   │   ├── en.json         
│   │   │   │   └── zh.json         
│   │   │   ├── lib 
│   │   │   │   ├── monaco-editor/  
│   │   │   │   ├── bootstrap.min.js  
│   │   │   │   ├── FileSaver.js   
│   │   │   │   ├── funclib.min.js
│   │   │   │   └── jquery.min.js                 
│   │   │   └── img/  
│   │   ├── favicon.ico             
│   │   ├── index.html              
│   │   ├── main.ts                 
│   │   ├── styles.css              
│   │   ├── typings.d.ts            
│   │   └── ...                     
│   ├── tools                       
│   │   └── update-zjson.js         
│   ├── package.json                
│   ├── angular.json                
│   ├── proxy.conf.json             
│   ├── README.md                   
│   └── ...                         
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
