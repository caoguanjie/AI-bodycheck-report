<p align="center">
<img src="https://img.shields.io/badge/Vue-3.3.4-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-4.4.3-green.svg"/>
    <img src="https://img.shields.io/badge/pinia-2.1.4-blueviolet.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.3.7-blue.svg"/>
    <a src="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/github/stars/caoguanjie/fitsadmin.svg?style=social&label=Stars"/>
    </a>
    <br/>
    <a href="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/badge/Author-丰德前端框架组-orange.svg"/>
    </a>
</p>
<p align="center">
    <a target="_blank" href="https://caoguanjie.github.io/fitsadmin/">在线预览</a> |  <a target="_blank" href="https://caoguanjie.github.io/fitsadmin/">官方文档</a> 
</p>

# 介绍

## 该项目是在[FitsAdmin](https://github.com/caoguanjie/fitsadmin.git)的框架下进行开发的 

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```sh
├── hook                                 # 构建相关的nodejs操作系统文件
├── plop-templates                       # 基本模板
├── public                               # 静态资源
|-- libs                                 # 封装组件的编译后的文件夹，FitsAdminUI组件库
    |   |-- assets                       # 组件库的资源文件
    |   |-- Form                         # 封装的表单组件
    |       └-- FitsTreeSelect.vue.d.ts
    |   |-- fits-admin-ui.es.js          # 编译后的文件，适合requeir导入
    |   |-- fits-admin-ui.umd.js         # 编译后的文件，适合important导入
    |   |-- index.d.ts                   # 组件库的声明文件
    |   |-- style                        # 组件库的样式文件
    |   |-- README.md                    # 组件库的说明文件
    |   └-- package.json                 # 组件库的版本控制
    └── favicon.ico                      # favicon图标
|-- docs                                 # 组件库的文档和展示界面相关文件夹
    |-- components                       # 存放组件相关文档
    |-- guide                            # 介绍跟FitsAdmin框架相关的学习文档
    |-- styles                           # 组件库的样式文件
    |-- index.md                         # 组件库的首页
    └-- .vuepress                        # vuepress 项目的一些配置文件夹
        |-- .cache                       # 缓存文件夹，可随时删除
        |-- .temp                        # 模板文件夹，里面存放md文件编译后的HTML文件，可随时删除
        |-- public                       # vuepress的资源文件
        |-- client.ts                    # 注册导入第三方UI库，或者服务器调用的文件
        |-- config.ts                    # vuepress最重要的配置文件，配置有头部、侧边栏、vite的配置项，自动导入功能，代码展示等
        |-- theme.ts                     # vuepress的主题设置，
        └-- sidebar.ts                   # 侧边栏的配置文件 
├── src                                  # 源代码
│   ├── api                              # 所有请求
│   ├── assets                           # 主题、字体、图片等静态资源
│       ├── icons                        # 项目所有 svg icons
│       └── Base                         # 框架本身所有用到的svg、png图片。
│   ├── components                       # 全局公用组件
│   ├── directive                        # 全局指令
│   ├── layout                           # 全局 layout
│   ├── router                           # 路由
│       ├── base                         # 框架预定义的一些常量路由
│       └── modules                      # 这块是存放业务级别的路由，每个项目的业务路由不一样
│   ├── store                            # 全局 store管理
│       ├── base                         # 框架本身预定义的一些全局状态管理
│       └── modules                      # 各个项目可以自定义的一些状态管理文件
│   ├── styles                           # 全局样式
│   ├── utils                            # 全局公用方法、工具类
│       ├── base                         # 框架定义的共用方法
│       ├── http                         # 封装的http统一接口处理的服务
│       └── is                           # is函数类
│   ├── types                            # ts全局声明的interface、type、class的类型
│   ├── views                            # views 所有页面
│   ├── App.vue                          # 入口页面
│   ├── main.ts                          # 入口文件 加载组件 初始化等
│   ├── components.d.ts                  # 声明文件，声明全局组件的类型
│   └── env.d.ts                         # 声明文件，环境变量的声明文件，方便vs做ts类型检查、提示
├── .env.xxx                             # 环境变量配置
├── .eslintrc.js                         # eslint 配置项
├── .babelrc                             # babel-loader 配置
├── .prettierrc.js                       # 配置代码规范、格式
├── .commitlint-config                   # 前端代码提交规范，跟husky配合使用，只适用git
├── index.html                           # html模板
├── vite.config.ts                       # vite 配置
├── README.md                            # 项目的说明文件
├── tsconfig.json                        # ts项目的配置文件
├── package.json                         # package.json
└── yarn.lock                            # 锁住各种包的版本号
```

## 安装
```sh
# 下载项目
git clone https://github.com/caoguanjie/fitsadmin.git

# 进入项目目录
cd fitsadmin

# 安装依赖
npm install

#建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题, 也可以通过VPN科学上网的方式解决npm带来的问题
yarn 
# 或者
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```