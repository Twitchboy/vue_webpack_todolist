const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // webpack 4.x,需要指定此插件的版本；不然会报错

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: {
        app: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            // 处理 vue 模板
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            // 处理 css,让js 可以识别css
            {
                test: /\.styl(us)?$/,
                // 这块只需要在上生产的时候做就可以了，所以到时候再进行配置下
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
                            }
                        },
                        'stylus-loader'
                    ]
                })
            },
            // 处理图片
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        // 可以将图片转化为base64格式
                        loader: 'url-loader', // 基于file-loader 封装
                        options: {
                            limit: 1024, // 小于 1024 文件 => base64
                            name: '[name].[ext]' // 输出文件名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 配置的全局常量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        // 引入vue-loader插件
        new VueLoaderPlugin(),
        // 分离css形成单独的文件
        new ExtractTextPlugin('[name].css'),
        // 生成 html 入口文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/assets/index.template.html')
        })
    ],
    resolve: {
        extensions: ['.vue', '.js', '.css','.styl'],

        modules: [
            path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
        ]
    }
}

if (isDev) {
    // 代码与编译代码，浏览器调试，定位错误；映射
    config.devtool = "#cheap-module-eval-source-map";

    config.devServer = {
        port: 8000, // 端口
        host: '0.0.0.0',  // http://127.0.0.1 或者 内网本机IP，这样别人也能访问
        overlay: {  // webpack 编译过程中出现错误都显示再网页上
            errors: true
        },
        // historyFallback: {}, // 访问地址不识别的时候，映射到 index
        open: true,  // 打开浏览器窗口
        hot: true // 热更新， 组件修改，只更新组件
    };

    config.plugins.push(
        // 实际的模块热加载，其实需要我们自己在前端写代码去定义的，这里 vue-loader 帮我们解决了
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        new webpack.NoEmitOnErrorsPlugin()  // 编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    )

} else {
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                }
            }
        }
    };
}

module.exports = config;
