from fastapi import APIRouter
from fastapi.responses import HTMLResponse;
#HTMLResponse是fastapi提供的响应类，用于返回HTML页面。
router = APIRouter()

# 根目录导航页，返回HTML页面
# include_in_schema属性让下面的函数不出现在接口文档
@router.get("/", include_in_schema=False)
async def get_welcome_page():
    return HTMLResponse(
        content="""
          <h3>Your backend is running correctly. Welcome to AITJanalysis!</h3>
          <a href="/docs">API documentation</a>
        """
    )
