
from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
import traceback
from openai import OpenAI
import os
import json
from prompts import SYSTEM_CONTENT

router = APIRouter()
@router.websocket("/process_report")
async def stream_code(websocket: WebSocket):
    await websocket.accept()
    print("Incoming websocket connection...")
    
    # 定义错误处理函数
    async def throw_error(
        message: str,
    ):
        await websocket.send_json({"type": "error", "value": message})
        await websocket.close()
    # 获取参数
    params = await websocket.receive_json()
    print(f"#params: {params}")

    # 接口获取系统模版消息，如果没有默认提示模板
    system_content = SYSTEM_CONTENT
    if "system_content" in params and params['system_content']:
        system_content = params['system_content']

    # 获取接口需要的api_key
    api_key = os.environ.get("MOONSHOT_API_KEY")
    if "API_KEY" in params and params['API_KEY']:
        api_key = params['API_KEY']
    
    # 获取ai的接口地址
    api_url = "https://api.moonshot.cn/v1"
    if "AI_API_URL" in params and params['AI_API_URL']:
        api_url = params['AI_API_URL']
    # print(f"#params: {api_key},{api_url}")

    client = OpenAI(
        api_key=api_key,
        base_url=api_url,
    )

    # print(f"#client: {len(json.dumps(params['user_content']))}")

    def generate_prompt():
        prompt_array = []
        all_data = params['user_content']
        for idx, report in enumerate(all_data['reportData']):
            _list = []
            _list.append(f"项目{idx+1}：")
            _list.append(f"检验项目:{report['typeName']}")
            _list.append(f"检验结果:{report['result']}")
            item = []
            for index, items in enumerate(report['data']):
                item.append(f"{index}. {items['itemName']}: {items['itemVaule']}，参考范围：{items['itemReferVaule']}，单位：{items['ItemUnit']}")

            full_text = "\n".join(item)
            _list.append(f"检验明细：{full_text}")
            prompt_item = "\n".join(_list)
            prompt_array.append(prompt_item)
        

        prompt = "\n".join(prompt_array)
        print(f"完整的prompt：{prompt}")
        return prompt



    try:
        completion_coroutine = client.chat.completions.create(
            model="moonshot-v1-8k",
            messages=[ 
                {"role": "system", "content": system_content},
                {"role": "user", "content":  generate_prompt()}
            ],
            temperature=0.1,
            max_tokens=4096,
            stream=True
            )
        async def process_chunk(content: str):
            await websocket.send_json({"type": "success", "value": content})
        collected_messages = []
        for idx, chunk in enumerate(completion_coroutine):
            # print("Chunk received, value: ", chunk)
            chunk_message = chunk.choices[0].delta
            # 如果数据为空直接跳过
            if not chunk_message.content:
                continue
            collected_messages.append(chunk_message)  # save the message
            content1 = "".join([m.content for m in collected_messages])
            print(f"#{idx}: {content1}")
            await process_chunk(chunk_message.content)

    except Exception as e:
        traceback.print_exc()
        print("AI分析链接失败", e)
        # Send set code even if image generation fails since that triggers
        # the frontend to update history
        await websocket.send_json({"type": "error", "value": "AI分析失败"})
        
    
    await websocket.close()
   

