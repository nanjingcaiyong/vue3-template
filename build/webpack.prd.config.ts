import baseWebpackConfig from './webpack.base.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressWebpackPlugin from 'compression-webpack-plugin';
import config from '../config';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      /** 
       * async: 对于动态加载的模块，默认配置会将该模块单独打包。使用以下语法进行动态加载（还有其他写法）: import('lodash')
       * initial: 表示只从入口模块进行拆分
       * all: 表示以上两者都包括
      */
      chunks: 'all',
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      minChunks: 2, // 拆分前引入模块的最小次数,
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）, 19.53125kb。
      cacheGroups: {
        vendors: { // 对node_modules进行分包
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: 10, // 优先级，要比default的优先级要高，否则会被覆盖
          reuseExistingChunk: true
        },
        default: { // 对业务模块中共用的模块进行分包
          name: 'commons',
          chunks: 'initial',
          reuseExistingChunk: true
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name]/js/[name].js',
    publicPath: config.build.env.APP_CDN,
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  plugins: [  
    new CopyWebpackPlugin({
      patterns: [{
        from: 'static',
        to: config.build.assetsSubDirectory,
      }],
    }),
    new CompressWebpackPlugin({
      test: /\.js(\?.*)?$/i, // z
      threshold: 10240, // 这里设置的是10K以上的进行压缩
      deleteOriginalAssets: false, // 是否删除原文件
      minRatio: 0.8
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/css/[name].css' ,
      chunkFilename: '[name]/css/[id].css' ,
    })
  ],
  externals:{}, // 外部CDN等扩展
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins!.push(new BundleAnalyzerPlugin())
}

export default webpackConfig