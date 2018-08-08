> 基于 ng-alain 1.2.0 ng-zorro

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

### 1. simple-table
```
1. 添加了表格序号
2. 将http.helpers 修改为 httpService
```

### 2. sidebar-nav
```
1. 修改路径中添加canload子路径后无法显示当前路径的问题，添加了getOpen(child)
```

### 3. title.service
```
1. 添加了getTitle方法
```

### 4. schema-form
```
1. ui 部分添加了 : enum(主要是为了texts做为数据字典使用) , styleLabel(Label部分的style) , styleControl(Control的style)
```

## 三、版本升级时出现的错误

### 1. 安装的时候出现 Cannot find module 'webpack'
```
有可能是升级了大版本号，只是更改了package.json，但没有更改package-lock.json，二者版本出现了不一致，则需要把package-lock.json删除重新生成。
``` 
