const glob = require('glob');
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.entries = () => {
  const map = {};
  const files = glob.sync('./entrys/*.js');
  files.map(file => {
    const filename = file.replace(/^\.\/entrys\//, '');
    map[filename] = file;
  });
  return map;
};

exports.htmlPlugin = () => {
  const arr = [];
  const entryHtml = glob.sync('./pages/*.html');
  entryHtml.map(htmlPath => {
    const filename = htmlPath.replace(/^\.\/pages\//, '');
    const chunkname = filename.replace(/\.html$/, '');
    const htmlPluginConfig = new HtmlWebpackPlugin({
      filename: filename,
      inject: true,
      template: htmlPath,
      // chunksSortMode: 'none',
      // chunks: [chunkname]
    });
    arr.push(htmlPluginConfig);
  });
  return arr;
};

