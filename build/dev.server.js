const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config.js');
const net = require('net');
const os = require('os');
const chalk = require('chalk'); // 修改控制台字符串样式

const compiler = webpack(webpackConfig);
const localServer = new WebpackDevServer(compiler, {
  contentBase: '/',
  compress: true,
  open: true,
  // hot: true, //XXX: 设置hot, 无法热更
  proxy: {
    '/apis': {
      target: 'https://bff-shopify-release.kapeixi.cn/service',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/apis': '' //代理的路径
      }
    }
  },
  stats: 'minimal', // 控制台只打印错误信息
});
/**
 * @description 获取局域网ip
 * @returns 
 */
function getIPv4 () {
  const res = /192(.[0-9]{1,3}){3}/.exec(JSON.stringify(os.networkInterfaces()));
  return Array.isArray(res) && res.length > 0
    ? res[0]
    : '0.0.0.0';
}

/**
 * @description 判断端口是否可用
 * @param { number } port 端口号
 */
function portIsOccupied (port) {
  var server = net.createServer().listen(port);
  server.on('listening', function () {
    server.close(); // 关闭服务
    console.log(chalk.green('The port【' + port + '】 is available.'));
    localServer.listen(port);
    console.log(chalk.green('http://' + getIPv4() + ':' + port));
  });
  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') { // 端口已经被使用
      console.log(chalk.red('The port【' + port + '】 is occupied, please change other port.'));
      portIsOccupied(++port);
    }
  });
}

portIsOccupied(8080);



