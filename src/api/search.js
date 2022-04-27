import request from '@/utils/request'

// 获取联想建议
export const getSuggestion = (params) => request({
    method: "get",
    url: "/v1_0/suggestion",
    params
})

// 获取搜索结果
export const getSearchResult = (params) => request({
    method: "get",
    url: "/v1_0/search",
    params
})