window.systemConfig = {
    // 接口地址
    api_url: 'http://192.168.32.51:8032/',
    yidong_url: 'http://183.234.96.206:9878/process_reportV1/',
    // yidong_url: 'http://192.168.14.89:8000/process_report/',
    // kimichat对应的接口地址
    websocket_url: 'ws://192.168.14.89:7001/process_report',
    // 流水号，唯一标识
    NowPhysicalNum: 'R20161221000037',
    titleStyle: {
        green: '体检总结',
        blue: '体检结论',
        purple: '处理建议'
    },
    // 文字滚动速度，毫秒级
    textSpeed: 50,
    // 对接ai类型，0 = 业务系统，1 = 移动， 2 = kimichat
    AI_TYPE: 2,
    // 大模型ai的接口
    AI_API_URL: 'https://api.moonshot.cn/v1',
    // ai接口的key
    API_KEY: "",
    // ai的模版消息
    Template: ''

}