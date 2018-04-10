var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'admin.html',
    //   template: 'admin.html',
    //   inject: true
    // }),

    
    new FriendlyErrorsPlugin()
  ]
})


Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  
  // 每个页面生成一个html
  var plugin = new HtmlWebpackPlugin({
      // 生成出来的html文件名
      filename: name + '.html',
      // 每个html的模版，这里多个页面使用同一个模版
      template: name+'.html',
      // 自动将引用插入html
      inject: true,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: [name]
  });
  webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;