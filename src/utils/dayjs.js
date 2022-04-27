import Vue from 'vue'
import dayjs from 'dayjs'

// 加载语言配置
import 'dayjs/locale/zh-cn'

// 全局使用
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})


