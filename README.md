> 基于 angular7 ， ng-alain 7.0.0 ， ng-zorro 7.0.0

> 感觉好用的朋友，麻烦请您留下您的star再走，谢谢！

## 一、执行

```
# install npm package
npm install

# start the serve
npm start

# use HMR
npm run serve:hmr
```

## 二、目录说明

```
src
├─app\@core 核心控制
│       ├─control 基础页面类，使用者可继承
│       ├─data 权限控制、用户、状态类
│       ├─helpers 工具类
│       ├─i18n 语言类
│       ├─model 数据定义接口
│       ├─net http和拦截器
│       ├─startup 初始化服务
│       ├─utils 提醒等工具
│
├─app\@shared 共享模块
│       ├─ directives 全局指令
│       ├─ json-schema 自定义动态表单
│
├─app\layout 公共布局类
│       ├─ common 公共布局组件
│       ├─ default admin后台布局
│       ├─ exception 异常布局
│       ├─ fullscreen 全屏布局
│       ├─ home 前台公共布局
│       ├─ passport 后台登录布局
│       ├─ template 公共HTML模板
│
├─app\routes 业务组件类
│       ├─ admin 后台业务页面
│       ├─ home 前台业务页面
│
├─styles 全局样式类
├─delon delon 类 （直接集成delon的目的是为了可以个性化，方便项目扩展）
```

## 三、delon 修改的地方

### 1. st

```
1. abc\table\table.component.html：添加了表格序号；
2. abc\table\style\index.less：添加了表格序号样式；
3. table\table-data-source.ts： 将 \_HttpClient 更换为 HttpService
```

### 2. title.service

```
1. theme\src\services\title\title.service.ts：添加了 getTitle 方法
```

### 3. schema-form

```
1. form\src\sf.component.ts：添加了 submit() 方法
2. form\src\sf-item-wrap.component.ts：添加了[ngStyle]="ui.styleLabel" 和 [ngStyle]="ui.styleControl"
3. form\src\schema\ui.ts：添加了 SFEnumSchema , SFstyleSchema，SFoptionsSchema 接口
```