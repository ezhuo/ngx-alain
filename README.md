> 基于 ng-alain 2.0.0 ng-zorro

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
- src\app\@core 工具类、基础页面类（可继承）、http 拦截器等
- src\app\@shared 共享模块，每个业务模块都需要导入
- src\app\layout 公共布局类
- src\app\routes 业务组件类
- src\styles 样式类
- src\delon delon 类
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
form\src\sf.component.ts：添加了 submit() 方法
form\src\sf-item-wrap.component.ts：添加了[ngStyle]="ui.styleLabel" 和 [ngStyle]="ui.styleControl"
form\src\schema\ui.ts：添加了 SFEnumSchema , SFstyleSchema，SFoptionsSchema 接口
```

## 四、版本升级时出现的错误

### 1. 安装的时候出现 Cannot find module 'webpack'

```
有可能是升级了大版本号，只是更改了 package.json，但没有更改 package-lock.json，二者版本出现了不一致，则需要把 package-lock.json 删除重新生成。
```

```

```
