const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: {
        app: path.join(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            // 处理 vue 模板
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // 处理 css,让js 可以识别css
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
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

        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['.vue', '.js', '.css','.styl']
    }
}

if (isDev) {
    config.devtool = "#cheap-module-eval-source-map"; // 代码与编译代码，浏览器调试，定位错误；映射

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

}

module.exports = config;
