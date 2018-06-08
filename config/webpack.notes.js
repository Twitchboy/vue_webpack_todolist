const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: {
    notes: path.resolve(__dirname, '../notes/index.entry.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../notes_build')
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
        NODE_ENV: '"development"'
      }
    }),
    // 引入vue-loader插件
    new VueLoaderPlugin(),
    // 生成 html 入口文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../notes/index.tpl.html')
    }),
    // 实际的模块热加载，其实需要我们自己在前端写代码去定义的，这里 vue-loader 帮我们解决了
    new webpack.HotModuleReplacementPlugin() // 模块热替换插件
  ],
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.css', '.styl'],
    alias: {
      'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
    },
    modules: [
      path.resolve(__dirname, '../node_modules') // 指定当前目录下的 node_modules 优先查找
    ]
  },
  devServer: {
    port: 8001, // 端口
    host: '0.0.0.0', // http://127.0.0.1 或者 内网本机IP，这样别人也能访问
    overlay: { // webpack 编译过程中出现错误都显示再网页上
      errors: true
    },
    // historyFallback: {}, // 访问地址不识别的时候，映射到 index
    open: true, // 打开浏览器窗口
    hot: true // 热更新， 组件修改，只更新组件
  },
  // 优化
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true // 运行时，非 entry指定的代码，把runtime相关的代码打包到 runtime 文件里
  }
}
