import request from '@/utils/request'

// 登录
export const login = (data) => request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
})

// 发送验证码
export const sendSms = (mobile) => request({
    method: "get",
    url: `/v1_0/sms/codes/${mobile}`,
})

// 获取用户自己信息
export const getUserInfo = () => request({
    method: "get",
    url: '/v1_0/user',
})


// 获取用户频道
export const getUserChannels = () => request({
    method: "get",
    url: '/v1_0/user/channels',
})


// 获取用户个人资料
export const getUserProfile = () => request({
    method: "get",
    url: '/v1_0/user/profile',
})

// 编辑用户个人资料   
export const editUserProfile = (data) => request({
    method: "PATCH",
    url: '/v1_0/user/profile',
    data
})

// 编辑用户照片资料（头像、身份证照片）
export const updateUserAvatar = (data) => request({
    method: "PATCH",
    url: '/v1_0/user/photo',
    data
})



