from openai import OpenAI
import asyncio
from prompts import SYSTEM_CONTENT
import os
client = OpenAI(
    api_key=os.environ.get("MOONSHOT_API_KEY"),
    base_url="https://api.moonshot.cn/v1",
)
async def moonshot_ai_response(text):
    completion_coroutine = client.chat.completions.create(
        model="moonshot-v1-8k",
        messages=[ 
            {"role": "system", "content": SYSTEM_CONTENT},
            {"role": "user", "content": text}
        ],
        temperature=0.1,
        max_tokens=4096,
        stream=True
        )
    print(completion_coroutine)
    collected_messages = []
    for idx, chunk in enumerate(completion_coroutine):
        # print("Chunk received, value: ", chunk)
        chunk_message = chunk.choices[0].delta
        if not chunk_message.content:
            continue
        collected_messages.append(chunk_message)  # save the message
        print(f"#{idx}: {''.join([m.content for m in collected_messages])}")
    print(f"Full conversation received: {''.join([m.content for m in collected_messages])}")
    # completion = await asyncio.to_thread(completion_coroutine)
    # print(completion)
    return completion_coroutine


