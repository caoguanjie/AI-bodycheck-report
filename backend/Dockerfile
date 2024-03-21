# 使用Python 3.12的slim版本作为基础镜像
FROM python:3.12-slim-bullseye

# 设置Poetry版本
ENV POETRY_VERSION 1.4.1

# 安装系统依赖
RUN pip install "poetry==$POETRY_VERSION"

# 设置工作目录
WORKDIR /app

# 复制文件到缓存
COPY poetry.lock pyproject.toml /app/

# 禁用虚拟环境
RUN poetry config virtualenvs.create false

# 安装依赖
RUN poetry install

# 复制当前目录内容到容器
COPY ./ /app/
