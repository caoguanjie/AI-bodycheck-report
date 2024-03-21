
import http from '@/utils/http';


/**
 * 查询检查单目标用户数据源
 * @param data
 */
export function GetUserList(params: any) {
    return http({
        url: '/AIReport/GetUserList',
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
        url: '/AIReport/GetItemList',
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
        baseURL: window.systemConfig.yidong_url,
        method: 'post',
        data,
        timeout: 60000000,
        isLoading: false
    })
}

/**
 * 内部的接口
 * @param data 
 * @returns 
 */
export function GetInspectionResult(params: any) {
    return http({
        url: '/AIReport/GetInspectionResult',
        method: 'get',
        params,
        timeout: 60000000,
        isLoading: false
    })
}

