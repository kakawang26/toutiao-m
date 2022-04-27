// 封装本地存储操作模块

// 存储
export const setItem = (key, value) => {
    if (typeof value == 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取
export const getItem = key => {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}


// 删除
export const removeItem = key => {
    window.localStorage.removeItem(key)
}