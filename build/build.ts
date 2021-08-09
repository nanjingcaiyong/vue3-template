process.env.NODE_ENV = 'production'
import ora from 'ora'; // 控制台中显示loading等图标
import chalk from 'chalk'; // 修改控制台字符串样式
import webpack from 'webpack';
import webpackConfig from './webpack.prd.config';

// require('./check-versions')()
const spinner = ora('building for ' + process.env.NODE_ENV);
spinner.start();

webpack(webpackConfig, (err, stats:any) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children:true, // 如果使用的是ts loader，将其设置为true将使typescript错误在构建期间显示
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
  console.log(chalk.cyan('  Build complete.\n'))
  const date = new Date(stats.endTime - stats.startTime);
  console.log(chalk.cyan(`打包完成✅.\n  耗时:${date.getMinutes()}分${date.getSeconds()}秒\n`));
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
});