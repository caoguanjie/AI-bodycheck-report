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

AI体检报告分析小应用，结合医院体检报告业务，对每个检验单的数据进行简单的分析，并让生成的小结提供给医生审查，让医生判断是否可用

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```sh
├── backend                              # python后端
├── frontend                             # 基于框架Fitsadmin开发
```

## 🛠 快速入门


该应用程序有一个Vue3/Vite前端和一个FastAPI后端。您需要一个能够访问GPT-4 Vision API的OpenAI API密钥、或者是国内Moonshot AI的API密钥。

### 运行后端
> 我使用Poetry进行包管理-如果您没有，请使用`pip install poetry`）


```bash
cd backend
echo "MOONSHOT_API_KEY=sk-your-key" > .env
poetry install
poetry shell
poetry run uvicorn main:app --reload --port 7001
```


### 运行前端
```bash
cd frontend
pnpm install
pnpm run dev
# 打包命令：
pnpm run build:dev
```
打开` http://localhost:5173 `就可以使用前端应用了

### 关于前端配置
> 路径：frontend/public/static/config.js


## Docker-Comopse部署
如果您的系统上安装了Docker，请在根目录中运行：


```bash
echo "MOONSHOT_API_KEY=sk-your-key" > .env
docker-compose up -d --build
```
