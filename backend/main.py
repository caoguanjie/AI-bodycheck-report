# 加载环境变量
from dotenv import load_dotenv

# 这步直接提前加载环境变量
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import home,base,generate_result


app = FastAPI()


# 配置允许跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 添加路由绑定
app.include_router(home.router)
app.include_router(base.router)
app.include_router(generate_result.router)