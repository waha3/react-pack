const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.entries = () => {
  const map = {};
  const files = glob.sync('./entrys/*.js');
  files.map(file => {
    const filename = file.replace(/^(\.\/entrys\/)(.*)(\.js)$/, '$2');
    map[filename] = file;
  });
  return map;
};

exports.htmlPlugin = (production = false) => {
  const arr = [];
  const entryHtml = glob.sync('./pages/*.html');
  entryHtml.map(htmlPath => {
    const filename = htmlPath.replace(/^\.\/pages\//, '');
    const chunkname = filename.replace(/\.html$/, '');
    const htmlWebpackConfig = {
      filename: filename,
      inject: true,
      template: htmlPath,
      cache: true,
      chunks: ['manifest', 'vendor', chunkname]
    };

    if (production) {
      Object.assign(htmlWebpackConfig, {
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      });
    }
    arr.push(new HtmlWebpackPlugin(htmlWebpackConfig));
  });
  return arr;
};

