import request from '@/utils/request'

// 获取文章列表
export const getArticleList = (params) => request({
    method: "get",
    url: '/v1_0/articles',
    params
})

// 获取文章详情
export const getArticleInfo = (articleId) => request({
    method: "get",
    url: ` /v1_0/articles/${articleId}`,
})
