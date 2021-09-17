const baseWebpackConfig = require('./webpack.base.config.js');
const WebpackMerge = require('webpack-merge');
const webpack = require('webpack');
const config = require('../config/index.js');

const { merge } = WebpackMerge;
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
  ]
});

module.exports = webpackConfig;