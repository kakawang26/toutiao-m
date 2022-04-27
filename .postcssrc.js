//  PostCSS 配置文件
module.exports = {
    // 配置要使用的 PostCSS插件
    plugins: {
        // 配置使用 autoprefixer 插件：生成浏览器 CSS 样式规则前缀
        // 'autoprefixer': {
        //     // 配置要兼容的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },


        // 把 px 转换为 rem
        'postcss-pxtorem': {
            // lib-flexible 的 REM 适配方案是把屏幕平均分成10份
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },
            propList: ['*'],    // * 代表转换所有属性

            // 配置不要转换的样式资源
            exclude: 'github-markdown'
        }
    }
}

