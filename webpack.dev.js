const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const { entries, htmlPlugin } = require('./util.js');

const entryConfig = entries();

Object.keys(entryConfig).map(key => {
  entryConfig[key] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', entryConfig[key]];
});

console.log(entryConfig);

console.log(htmlPlugin())

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: entryConfig,
  // entry: entries(),
  devServer: {
    contentBase: './dist',
    port: 9000,
    hot: true
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
    ...htmlPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
  ],
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  }
});
