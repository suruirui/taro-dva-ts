# taro 移动端 ts 版（H5、微信小程序、...）

## 一、项目启动/构建

- H5

```
npm run dev:h5
npm run build:h5
```

- 微信小程序

```
npm run dev:weapp
npm run build:weapp
```

## 二、技术栈 taro+dva

- [Taro 快速上手](https://taro-docs.jd.com/taro/docs/spec-for-taro.html)
- [Dva 快速上手](https://dvajs.com/guide/)
- Dva 需要的支持包
  - dva-core
  - dva-loading
  - redux
  - redux-logger
  - redux-thunk
  - "@tarojs/redux": "1.3.29"
  - "@tarojs/redux-h5": "1.3.29"
  - "@tarojs/async-await": "1.3.29"

```
yarn add  dva-core dva-loading redux redux-logger redux-thunk @tarojs/redux@1.3.29 @tarojs/redux-h5@1.3.29 @tarojs/async-await@1.3.29 --save
```

## 三、模块开发

- 一个页面为一个独立目录(模块)，一个页面可能包含(\*为必需)：
  - \*index.tsx UI 组件
  - \*index.scss 组件样式
  - 页面私有组件(目录)
- 在 service 层定义数据请求
- 在 model 层定义业务模型
- 在 app.tsx(项目入口文件)中 config,pages 定义路由

## 四、项目结构（src）

```
    ├─assets 公共静态资源
    │ ├─images 图片
    │ └─styles 样式
    ├─components 通用组件
    ├─models 数据model层
    ├─pages 页面容器
    │ ├─me 个人中心
    │ │ ├─index 个人中心首页
    │ └─index 首页
    │   ├─index
    |─service 数据service层
    └─utils 工具包
```
