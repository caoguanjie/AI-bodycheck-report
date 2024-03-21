// url = ip:port/【接口名称】
export const useWebSocket = () => {
    const socket = ref<any>(null);
    const connected = ref(false);
    const messages = ref("");
    // 错误消息
    const errorMsg = ref("");
    const connect = () => {



        socket.value = new WebSocket(window.systemConfig.websocket_url); // 替换为你的WebSocket服务器地址
        socket.value.onopen = () => {
            connected.value = true;
            console.log('连接成功：WebSocket connected');
        };
        socket.value.onmessage = (response: any) => {
            console.log("websocket消息返回：", response)
            const result = JSON.parse(response.data)
            if (result.type === "success") {
                messages.value = result.value
            } else {
                errorMsg.value = result.value
                ElMessage.error('检查项目过多，AI分析失败')
            }
        };
        socket.value.onclose = () => {
            connected.value = false;
            console.log('WebSocket disconnected');

        };
        socket.value.onerror = (error: any) => {
            connected.value = false;
            console.error('WebSocket error:', error);

        };

    };

    const send = (message: any) => {
        if (socket.value && connected.value) {
            socket.value.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    };

    const disconnect = () => {
        if (socket.value) {
            socket.value.close();
        }
    };
    return { socket, errorMsg, connected, messages, connect, send, disconnect };
};