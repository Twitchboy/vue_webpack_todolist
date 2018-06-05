// const docsLoader = require('docsLoader');

module.exports = (_mode) => {
    // vue-loader options 配置参数
    return {
        preserveWhitespace: true,   // 过滤空格开启
        extractCSS: !_mode,         // 将 vue 里的 style 提取出来
        cssModules: {},             //
        // hotReload: false     // 热重载，根据环境变量自动生成不需要配置
        // loader: {
            // 'docs': docsLoader,  // 自定义 Loader, 给各个组件 写文档用的
            //  js:
            //  css:
        // },
        // preLoader: {},           // 加载loader之前先加载
        // postLoader: {}           // 加载loader之后再加载
    }
}
