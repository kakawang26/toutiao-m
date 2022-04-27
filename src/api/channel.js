import request from '@/utils/request'

// 获取所有频道列表
export const getAllChannels = () => request({
    method: "get",
    url: '/v1_0/channels',
})

// 添加我的频道
export const addMyChannels = (channels) => request({
    method: "PATCH",
    url: '/v1_0/user/channels',
    data: { channels }
})

// 删除用户指定频道
export const deleteMyChannel = (target) => request({
    method: "DELETE",
    url: `/v1_0/user/channels/${target}`,
})
