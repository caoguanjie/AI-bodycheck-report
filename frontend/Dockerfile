FROM node:20.9-bullseye-slim

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# Copy package.json and pnpm-lock.yml
COPY package.json pnpm-lock.yaml /app/

# 安装依赖
RUN pnpm install

# 复制当前目录内容到容器
COPY ./ /app/

# 构建项目（假设你的项目有一个构建脚本）
# RUN pnpm run build:dev

# 保留端口
EXPOSE 5173
# 设置数据卷，将容器内的 /app/ 目录与主机的当前目录下的一个文件夹关联
VOLUME ["/app/FitsAdmin"]

# 运行服务，应用程序的命令
CMD ["pnpm", "dev", "--host", "0.0.0.0"]