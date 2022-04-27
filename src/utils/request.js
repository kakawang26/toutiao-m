import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// json-bigint 基本用法
/* const jsonStr = '{"art_id":1245953273786007552}'

console.log(JSON.parse(jsonStr));  // 1245953273786007600

console.log(JSONBig.parse(jsonStr).art_id.toString());  //  1245953273786007552

console.log(JSON.stringify(JSONBig.parse(jsonStr)));

console.log(JSONBig.stringify(JSONBig.parse(jsonStr))); */

// 创建axios实例
const request = axios.create({
    baseURL: "http://toutiao.itheima.net",  // 基础路径

    // 自定义后端返回的原始数据
    // data：后端返回的原始数据，就是JSON格式的字符串
    transformResponse: [function (data) {
        try {
            return JSONBig.parse(data)
        } catch (error) {
            return data
        }
        // 默认处理方式
        return JSON.parse(data)
    }],
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config：请求的配置对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 务必返回config，否则请求将中止
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器

// 暴露 request
export default request