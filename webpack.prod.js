const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { entries, htmlPlugin } = require('./util.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: entries(),
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~'
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    runtimeChunk: {
      name: entrypoint => `manifest~${entrypoint.name}`
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    ...htmlPlugin(true)
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
});
