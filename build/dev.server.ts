process.env.NODE_ENV = 'development'
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from './webpack.dev.config';
import openInEditor from 'launch-editor-middleware'
import net from 'net';
import os from 'os';
import chalk from 'chalk'; // 修改控制台字符串样式
const compiler = webpack(webpackConfig);


const localServer = new WebpackDevServer({
  onBeforeSetupMiddleware({app}) {
    app?.use('/__open-in-editor', openInEditor('code'));
  },
}, compiler);
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
function portIsWorking (port: number) {
  const server = net.createServer().listen(port);
  server.on('listening', function () {
    server.close(); // 关闭服务
    console.log(chalk.green('The port【' + port + '】 is available.'));
    localServer.listen(port,"", () => {});
    console.log(chalk.green('http://' + getIPv4() + ':' + port));
  });
  server.on('error', function (err) {
    if (err.message === 'EADDRINUSE') { // 端口已经被使用
      console.log(chalk.red('The port【' + port + '】 is occupied, please change other port.'));
      portIsWorking(++port);
    }
  });
}

portIsWorking(8080);


