const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
//webpack压缩js插件
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const env = process.env.NODE_ENV || 'development';
const debug = env !== 'production';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
/**
 * 获取js入口文件方法 开发模式添加热加载代码
 * @author wangbinxiang
 * @date   2016-08-29T18:04:36+0800
 * @param  {String}                 pathName 入口文件地址
 * @return {Array}                          入口文件数组
 */
var getEntry = function (pathName, hotMiddlewareScript) {
  var entry = {};
  glob.sync(pathName).forEach(function (name) {
    const filename = path.basename(name, '.js');
    const files = [name]
    if (debug) {
      files.push(hotMiddlewareScript);
    };
    entry[filename] = files;
  });
  return entry;
};

/**
 * webpack配置
 * @type {Object}
 */
var config = {
  devtool: debug? 'eval-source-map': 'source-map',
  name: 'client-src',
  debug: debug,
  context: __dirname,
  entry: getEntry('./client-src/js/pages/**/*.js', hotMiddlewareScript),
  output: {
    path: path.join(__dirname, './client/js/pages/'), 
    publicPath: '/js/pages/', 
    filename: "[name]-[hash].js"
  },
  // watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        ko: "knockout"
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: "commons", filename: "commons.js", minChunks: 2 }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};

if (!debug) {
  config.plugins.push(new UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

module.exports = config;