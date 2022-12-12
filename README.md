## 实现babel插件并在react项目中使用

[如何实现一个babel插件](https://github.com/Bill70058/babel-note)

### 项目启动
```
cd babel-demo
npm i
npm start
```

### 前提
认识几个会用到的命令行
```
npm init // 初始化一个npm包
npm link // 将当前包暴露到全局(可能会遇到权限问题，进入管理者模式运行即可)
npm link xxx(包名) // 引入全局的包，会在node_modules创建一个包同名的快链
```

### 创建一个包
1. 首先，需要在根目录创建一个文件夹，用来存放插件的
代码，最好是与包名(package.json的name属性)同名
2. 通过``npm init``将包初始化
3. 创建一个index.js文件，用来存放插件代码

### 暴露包
1. 在包的根目录下，通过``npm link ./``将包暴露到全局，该命令行可能遇到权限问题，window在管理员模式下运行git bash，mac则用``sudo npm link ./``

### 引入包
1. 回到项目根路径下，运行``npm link xxx(包名)``，此时正确引入的话会在项目node_modules里看到包的快链，映射了包的代码
2. 在package.json的babel配置项里，在plugins属性将插件引入

### 插件目录
- insert-plugin: 打印console的同时输出console所在文件名及行列
- insert-track-plugin: 自动埋点

### 注意：
1. 该项目是用``create-react-app``创建的，自带了babel-loader配置，如果是别的方式创建，要使用babel的话还需要配置babel-loader
2. vite不支持bebel，它有自己的一套插件处理转码等问题
3. 一次引入多个模块要一句引入写完，比如``npm link insert-track-plugin tracker``，否则会只有一个插件被引入
