import baseWebpackConfig from './webpack.base.config';
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import config from '../config/index';

const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
  ],
  devServer: {
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
    }
  },
});

export default webpackConfig;