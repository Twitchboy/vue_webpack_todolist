// webpack 4.x,需要指定此插件的版本,不然会报错; 弃用
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// webpack 4.x 版本，提取CSS；vue 推荐
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        // 这块只需要在上生产的时候做就可以了，所以到时候再进行配置下
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        // use: ExtractTextPlugin.extract({
        //     fallback: 'vue-style-loader',
        //     use: [
        //         'css-loader',
        //         {
        //             loader: 'postcss-loader',
        //             options: {
        //                 sourceMap: true // 根据stylus-loader 生成的 sourceMap 继续编译，加快处理速度
        //             }
        //         },
        //         'stylus-loader'
        //     ]
        // })
        // MiniCssExtractPlugin 插件
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
      }
    ]
  },
  plugins: [
    // 分离css形成单独的文件
    // new ExtractTextPlugin('[name].[chunkHash:8].css'),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash:8].css'
    })
  ],
  // 优化，提取三方库
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  }
}
