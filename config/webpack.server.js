const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node', // 服务端运行
  entry: {
    server: path.resolve(__dirname, '../src/server.entry.js')
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // node 中运行，模块符合 CommonJS 规范
    filename: 'server_entry.js', // 模块加载的js，不需要使用浏览器中缓存的功能
    path: path.resolve(__dirname, '../server_build')
  },
  // 将外部扩展的库如 vue，排除打包到 bundle 中；本身服务端里 require 就可以加载这些依赖，不需要再打包到我们输出的文件里
  externals: Object.keys(require('../package.json').dependencies),
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
      // 处理 css,让js 可以识别css
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
            }
          },
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    }),
    // 引入vue-loader插件
    new VueLoaderPlugin(),
    // 分离css形成单独的文件
    // new ExtractTextPlugin('[name].[chunkHash:8].css'),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash:8].css'
    }),
    // 服务端渲染必须的插件
    new VueServerPlugin()
  ],
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.css', '.styl'],
    alias: {
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
    },
    modules: [
      path.resolve(__dirname, '../node_modules') // 指定当前目录下的 node_modules 优先查找
    ]
  },
  // 优化
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true // 运行时，非 entry指定的代码，把runtime相关的代码打包到 runtime 文件里
  }
}
