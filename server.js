const express = require('express');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.js');

const app = express();
const compiler = webpack(config);
const logger = console.log;

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './dist/index.html'))
// });

app.listen(3000, () => {
  logger(`${chalk.blue('> server in port 3000')}`);
});
