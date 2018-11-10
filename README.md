> 基于 ng-alain 1.4.0 ng-zorro

## 一、执行
```

# install npm package
npm install

# start the serve
npm start

# use HMR
npm run serve:hmr

```

## 二、delon修改的地方

### 1. st
```
1. abc\table\table.component.html：添加了表格序号；
2. abc\table\style\index.less：添加了表格序号样式；
3. table\table.component.ts：_btnClick 方法里添加：options.modalOptions = Object.assign(options.modalOptions || {}, { nzStyle: { top: '20px' } });
4. table\table-data-source.ts： 将 _HttpClient 更换为 HttpService
```

### 2. title.service
```
1. theme\src\services\title\title.service.ts：添加了getTitle方法
```

### 3. schema-form
```
form\src\sf.component.ts：添加了 submit() 方法 
form\src\sf-item-wrap.component.ts：添加了[ngStyle]="ui.styleLabel" 和 [ngStyle]="ui.styleControl"
form\src\schema\ui.ts：添加了  SFEnumSchema , SFstyleSchema，SFoptionsSchema 接口
```

## 三、版本升级时出现的错误

### 1. 安装的时候出现 Cannot find module 'webpack'
```
有可能是升级了大版本号，只是更改了package.json，但没有更改package-lock.json，二者版本出现了不一致，则需要把package-lock.json删除重新生成。
``` 
