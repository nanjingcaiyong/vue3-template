import ora from 'ora'; // 控制台中显示loading等图标
import chalk from 'chalk'; // 修改控制台字符串样式
import webpack from 'webpack';
import webpackConfig from './webpack.prd.config';

const spinner = ora('building for ' + process.env.NODE_ENV);
spinner.start();

webpack(webpackConfig, (err, stats:any) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');
  const date = new Date(stats.endTime - stats.startTime);
  console.log(chalk.cyan(`打包完成✅.\n  耗时:${date.getMinutes()}分${date.getSeconds()}秒\n`));
});

