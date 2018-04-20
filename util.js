const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(global.dev)

exports.entries = () => {
  const map = {};
  const files = glob.sync('./entrys/*.js');
  files.map(file => {
    const filename = file.replace(/^(\.\/entrys\/)(.*)(\.js)$/, '$2');
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
      chunks: ['manifest', 'vendor', chunkname]
    });
    arr.push(htmlPluginConfig);
  });
  return arr;
};

