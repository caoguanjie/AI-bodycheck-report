from fastapi import APIRouter
from moonshot import moonshot_ai_response
from pydantic import BaseModel


router = APIRouter()

class ItemList(BaseModel):
    ComposeID: str
    ItemID: str
    ItemName: str
    ItemUnit: str
    Value: str
    HighValue: str
    LowValue: str
    MaxValue: str
    MinValue: str

class NameModel(BaseModel):
    # 定义 name 对象的结构
    ComposeID: str
    ComposeName: str
    BriefSummary: str
    Advice: str
    ItemList: list[ItemList]



class prompt_content(BaseModel):
    report_content: str


class ChatResponse:
    def __init__(self, RslCode, RslMsg, Data):
        self.RslCode = RslCode
        self.RslMsg = RslMsg
        self.Data = Data



@router.post("/process_report",tags=["基础接口"])
async def process_report(request: prompt_content):
    content = """
[{\"ComposeID\":\"10\",\"ComposeName\":\"肝功全套(男)\",\"selected\":true,\"visible\":true,\"ItemList\":[{\"ItemID\":\"Item_0095\",\"ItemName\":\"血清腺苷脱氨酶\",\"ItemUnit\":null,\"Value\":\"24\",\"HighValue\":\"24\",\"LowValue\":\"4\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0031\",\"ItemName\":\"碱性磷酸酶\",\"ItemUnit\":null,\"Value\":\"120\",\"HighValue\":\"128\",\"LowValue\":\"53\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0012\",\"ItemName\":\"总胆汁酸\",\"ItemUnit\":null,\"Value\":\"9\",\"HighValue\":\"10\",\"LowValue\":\"0.1\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0034\",\"ItemName\":\"5’-核苷酸酶\",\"ItemUnit\":null,\"Value\":\"10\",\"HighValue\":\"10\",\"LowValue\":\"0.1\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0033\",\"ItemName\":\"亮氨酸氨基肽酶\",\"ItemUnit\":null,\"Value\":\"69\",\"HighValue\":\"70\",\"LowValue\":\"30\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0030\",\"ItemName\":\"γ-谷氨酰基转肽酶\",\"ItemUnit\":null,\"Value\":\"60\",\"HighValue\":\"61\",\"LowValue\":\"11\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0005\",\"ItemName\":\"直接胆红素\",\"ItemUnit\":null,\"Value\":\"6\",\"HighValue\":\"6.8\",\"LowValue\":\"1.7\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0017\",\"ItemName\":\"前白蛋白\",\"ItemUnit\":null,\"Value\":\"0.3\",\"HighValue\":\"0.4\",\"LowValue\":\"0.25\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0027\",\"ItemName\":\"胆碱酯酶\",\"ItemUnit\":null,\"Value\":\"10000\",\"HighValue\":\"11500\",\"LowValue\":\"1620\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0014\",\"ItemName\":\"白蛋白\",\"ItemUnit\":null,\"Value\":\"50\",\"HighValue\":\"51\",\"LowValue\":\"38\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0013\",\"ItemName\":\"总蛋白\",\"ItemUnit\":null,\"Value\":\"80\",\"HighValue\":\"87\",\"LowValue\":\"66\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0004\",\"ItemName\":\"总胆红素\",\"ItemUnit\":\"umol/L\",\"Value\":\"5\",\"HighValue\":\"22.2\",\"LowValue\":\"5.1\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0021\",\"ItemName\":\"丙氨酸氨基转移酶\",\"ItemUnit\":\"IU/L\",\"Value\":\"42\",\"HighValue\":\"41\",\"LowValue\":\"0\",\"MaxValue\":null,\"MinValue\":null},{\"ItemID\":\"Item_0022\",\"ItemName\":\"天门冬氨酸氨基转移酶\",\"ItemUnit\":\"IU/L\",\"Value\":\"39\",\"HighValue\":\"37\",\"LowValue\":\"0\",\"MaxValue\":null,\"MinValue\":null}]}]
"""

    resonse= await moonshot_ai_response(content)
    chat_data = ChatResponse(RslCode="1", RslMsg="Success", Data=resonse)
    # return Response(code=200, message="Success", data=chat_data)
    return chat_data