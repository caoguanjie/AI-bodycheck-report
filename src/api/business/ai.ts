
import http from '@/utils/http';


/**
 * 查询检查单目标用户数据源
 * @param data
 */
export function GetUserList(params: any) {
    return http({
        baseURL: './',
        url: '/static/userData.json',
        method: 'get',
        params,
        isLoading: false
    });
}


/**
 * 查询指定用户的检查单明细
 * @param data
 */
export function GetItemListApi(params: any) {
    return http({
        baseURL: './',
        url: '/static/data.json',
        method: 'get',
        params,
        isLoading: false
    });
}

/**
 * 后台中转中国移动的接口
 * @param data
 */
export function GetAIReport(params: any) {
    return http({
        url: '/AIReport/GetAIReport',
        method: 'get',
        params,
        isLoading: false
    });
}




/**
 * 中国移动的接口
 * @param data 
 * @returns 
 */
export function OtherAiApiUrl(data: any) {
    return http({
        baseURL: 'http://183.234.96.206:8767/',
        url: '/process_report',
        method: 'post',
        data,
        isLoading: false
    })
}

