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

# 保留端口
EXPOSE 5173

# 运行服务，应用程序的命令
CMD ["pnpm", "dev", "--host", "0.0.0.0"]