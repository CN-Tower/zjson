# 转杰森 | ZJSON
> 全力打造最好用的json格式化工具，欢迎一起来玩！

### 一、访问地址
- WebSite: https://www.zjson.net
- FuncLib: https://www.funclib.net
- GitHub: &nbsp;https://github.com/CN-Tower/zjson
- GitHub: &nbsp;https://github.com/CN-Tower/funclib
- Algorithm: https://github.com/CN-Tower/format-to-json

#### 主页界面
![](/images/zjson.png)
#### 对比界面
![](/images/zjson-diff.png)

### 二、简单介绍

转杰森是使用MEAN-STACK ( MongoDB + Express + Angular + NodeJS技术栈 ) 开发的一个JSON格式化和编辑工具，功能丰富强大、界面简洁美观，还有很多高级特性：

- [x] 支持错误的json解析及错误行号和错误类型提示；
- [x] 支持python unicode集合的解析；
- [x] 支持保存、删除和呈现格式化的历史；
- [x] 支持格式化后的json以文件的形式下载；
- [x] 支持中英文双语国际化；
- [x] 支持线上json分享；
- [x] 支持多种皮肤切换；
- [x] 支持JSON转义、压缩；
- [x] 支持JSON标准化析，把非标准JSON（如：js的object）转化为标准JSON格式；
- [x] 支持JSON对比（有与原码对比、与历史比对和与新建代码对比三种模式）；
- [x] 还有更多的功能、配置、特性等你去发现！

相比其它在线格式化工具，如：bejson.com和json.cn等，转杰森界面更加专业、功能更加实用，绝对是开发和测试的好工具。

![](/images/mean-stack.jpg)

### 三、运行项目

#### 开发启动
```bash
npm start
```

#### 项目打包
```bash
npm run build
```

#### 应用程序
Windows
```bash
npm run build:exe
```
MacOS
```bash
npm run build:dmg
```

### 四、项目结构
```
zjson ( Directories: 82, Files: 181 )
 ├─ e2e                                  # 端到端测试文件
 │ ├─ src
 │ │ ├─ app.e2e-spec.ts
 │ │ └─ app.po.ts
 │ └─ tsconfig.e2e.json
 ├─ electron-app                         # Electron配置文件
 │ ├─ index.html
 │ ├─ main.js
 │ ├─ package.json
 │ ├─ renderer.js
 │ ├─ zjson.icns
 │ └─ zjson.ico
 ├─ scripts                              # 脚本目录
 │ ├─ build.js
 │ ├─ build-exe.js
 │ ├─ build-msi.js
 │ ├─ clear.js
 │ ├─ electron.conf.js
 │ ├─ prepare.js
 │ └─ rename.js
 ├─ src                                  # 项目主目录
 │ ├─ app
 │ │ ├─ @shared
 │ │ │ ├─ index.ts
 │ │ │ ├─ message.service.ts
 │ │ │ ├─ interfaces.ts
 │ │ │ ├─ styles.less
 │ │ │ └─ theme.less
 │ │ ├─ app-config
 │ │ │ ├─ config-items
 │ │ │ │ ├─ config-indent.component.ts
 │ │ │ │ ├─ config-lang.component.ts
 │ │ │ │ ├─ config-quote.component.ts
 │ │ │ │ └─ config-theme.component.ts
 │ │ │ ├─ app-config.component.html
 │ │ │ ├─ app-config.component.less
 │ │ │ ├─ app-config.component.ts
 │ │ │ └─ index.ts
 │ │ ├─ attachments
 │ │ │ ├─ index.ts
 │ │ │ ├─ zjs-attachments.less
 │ │ │ ├─ zjs-compare.component.ts
 │ │ │ ├─ zjs-hint.component.ts
 │ │ │ ├─ zjs-hist.component.ts
 │ │ │ ├─ zjs-info.component.ts
 │ │ │ ├─ zjs-loading.component.ts
 │ │ │ ├─ zjs-notice.component.ts
 │ │ │ ├─ zjs-title.component.ts
 │ │ │ └─ zjs-update.component.ts
 │ │ ├─ formatter
 │ │ │ ├─ formatter.conf.ts
 │ │ │ ├─ formatter.core.ts
 │ │ │ └─ formatter.help.ts
 │ │ ├─ monaco-editor
 │ │ │ ├─ index.ts
 │ │ │ ├─ monaco-diff-editor.component.ts
 │ │ │ ├─ monaco-editor.base.ts
 │ │ │ ├─ monaco-editor.component.ts
 │ │ │ ├─ monaco-editor.themes.ts
 │ │ │ ├─ monaco-eidtor.service.ts
 │ │ │ ├─ zjs-diff-editor.component.html
 │ │ │ ├─ zjs-diff-editor.component.less
 │ │ │ └─ zjs-diff-editor.component.ts
 │ │ ├─ zjson-panel
 │ │ │ ├─ zjson-panel.component.css
 │ │ │ ├─ zjson-panel.component.html
 │ │ │ └─ zjson-panel.component.ts
 │ │ ├─ app.base.ts
 │ │ ├─ app.component.html
 │ │ ├─ app.component.less
 │ │ ├─ app.component.spec.ts
 │ │ ├─ app.component.ts
 │ │ ├─ app.module.ts
 │ │ ├─ app.service.ts
 │ │ └─ screen.service.ts
 │ ├─ assets
 │ │ ├─ css
 │ │ │ └─ loading.css
 │ │ ├─ i18n
 │ │ │ ├─ en.json
 │ │ │ └─ zh.json
 │ │ ├─ img
 │ │ │ ├─ chrome.png
 │ │ │ ├─ firefox.png
 │ │ │ └─ mean_stack.jpg
 │ │ └─ lib
 │ │   ├─ font-awesome/
 │ │   ├─ monaco-editor
 │ │   │ └─ vs
 │ │   │   ├─ base/
 │ │   │   ├─ basic-languages/
 │ │   │   ├─ editor/
 │ │   │   ├─ language/
 │ │   │   └─ loader.js
 │ │   ├─ FileSaver.js
 │ │   ├─ animate.min.css
 │ │   ├─ bootstrap.min.css
 │ │   ├─ bootstrap.min.js
 │ │   ├─ funclib.min.js
 │ │   └─ jquery.min.js
 │ ├─ environments
 │ │ ├─ environment.prod.ts
 │ │ └─ environment.ts
 │ ├─ browserslist
 │ ├─ favicon.ico
 │ ├─ index.html
 │ ├─ karma.conf.js
 │ ├─ main.ts
 │ ├─ polyfills.ts
 │ ├─ styles.less
 │ ├─ test.ts
 │ ├─ tsconfig.app.json
 │ ├─ tsconfig.spec.json
 │ ├─ tslint.json
 │ └─ typings.d.ts
 ├─ .editorconfig
 ├─ .gitignore
 ├─ README.md
 ├─ RELEASES
 ├─ angular.json
 ├─ mean.jpg
 ├─ package.json
 ├─ proxy.conf.json
 ├─ tsconfig.json
 ├─ tslint.json
 ├─ zjson-diff.png
 └─ zjson.png
```
