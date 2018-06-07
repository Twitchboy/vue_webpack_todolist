const webpack = require('webpack')
// 字面意思，根据不同环境的配置 merge 过来, 深层次的
const merge = require('webpack-merge')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const _mode = process.env.NODE_ENV || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const entryFiles = glob.sync('./src/*.entry.js') // 单、多入口处理

// vue-loader options
// const createVueLoaderOptions = require('./config/vue-loader.config');

let _entry = {}
for (let item of entryFiles) {
  const reg = /.+\/([a-zA-Z]+)(\.entry\.js)$/g // 匹配符合的 entry 文件，entry 可能是多个，多路口
  if (reg.test(item)) {
    const entryKey = RegExp.$1 // 提取
    _entry[entryKey] = item
  }
}

let basicConfig = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: _entry,
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 前置 pre or post; 在使用其他 loader 之前先处理
      },
      // 处理 vue 模板
      {
        test: /\.vue$/,
        use: 'vue-loader'
        // options: createVueLoaderOptions(_mode)
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: ['node_modules']
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
              name: 'resource/[path][name].[hash:8].[ext]' // 输出文件名
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
        NODE_ENV: _mode ? '"development"' : '"production"'
      }
    }),
    // 引入vue-loader插件
    new VueLoaderPlugin(),
    // 生成 html 入口文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/assets/index.template.html')
    })
  ],
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.css', '.styl'],

    modules: [
      path.resolve(__dirname, 'node_modules') // 指定当前目录下的 node_modules 优先查找
    ]
  },
  // 优化
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
}

module.exports = merge(basicConfig, _mergeConfig)
