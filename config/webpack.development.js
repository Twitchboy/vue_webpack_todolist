const webpack = require('webpack');
// 开发环境配置
module.exports = {
    // 代码与编译代码，浏览器调试，定位错误；映射
    devtool: "#cheap-module-eval-source-map",
    module: {
        rules: [
            // 处理 css,让js 可以识别css
            {
                test: /\.styl(us)?$/,
                oneOf: [
                    // 这里匹配 `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                    options: {
                                    modules: true,
                                    camelCase: true,
                                    localIdentName: '[name]_[hash:base64:5]'
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
                                }
                            },
                            'stylus-loader'
                        ]
                    },
                    // 这里匹配普通的 `<style>` 或 `<style scoped>`
                    {
                        use: [
                            'vue-style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
                                }
                            },
                            'stylus-loader'
                        ]
                    }
                ],
                // use: [
                //     // vue 开发，使用 vue-style-loader，修改样式才会有热更新的效果
                //     'vue-style-loader',
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true,
                //             localIdentName: '[local]-[hash:base64:5]',
                //             importLoaders: 2
                //         }
                //     },
                //     {
                //         loader: 'postcss-loader',
                //         options: {
                //             sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
                //         }
                //     },
                //     'stylus-loader'
                // ]
            }
        ]
    },
    devServer: {
        port: 8000, // 端口
        host: '0.0.0.0',  // http://127.0.0.1 或者 内网本机IP，这样别人也能访问
        overlay: {  // webpack 编译过程中出现错误都显示再网页上
            errors: true
        },
        // historyFallback: {}, // 访问地址不识别的时候，映射到 index
        open: true,  // 打开浏览器窗口
        hot: true // 热更新， 组件修改，只更新组件
    },
    plugins: [
        // 实际的模块热加载，其实需要我们自己在前端写代码去定义的，这里 vue-loader 帮我们解决了
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        // 编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段,确保输出资源不会包含错误。
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
