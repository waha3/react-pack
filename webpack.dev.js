const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const { entries, htmlPlugin } = require('./util.js');
const port = 9000;

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  devServer: {
    contentBase: './dist',
    port: port,
    hot: true,
    compress: true,
    quiet: true,
    historyApiFallback: {
      disableDotRule: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'less-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify(true)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    ...htmlPlugin(),
    new FriendlyErrorsPlugin()
  ],
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  }
});
