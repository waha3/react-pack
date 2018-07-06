const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { entries, htmlPlugin } = require('./util.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: entries(),
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      cache: true,
      sourceMap: true,
      parallel: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    ...htmlPlugin(true)
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
});
