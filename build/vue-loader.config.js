const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = function (options) {
  const generateLoaders = (loader, loaderOptions) => {
    return {
      test: new RegExp(`\\.${loader}$`),
      use: [
        'cache-loader', // 在一些性能开销大的 loader 之前添加此 loader, 可以将结果缓存在磁盘中
        devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: options.sourceMap,
          }
        },
        'postcss-loader',
        {
          loader: loader.replace('scss', 'sass') + '-loader',
          options: loaderOptions
        },
      ],
    };
  };
  return [
    generateLoaders('less'),
    generateLoaders('sass'),
    generateLoaders('scss')
  ];
};

const loaders = cssLoaders({
  sourceMap: devMode
    ? config.build.sourceMap
    : config.dev.sourceMap,
});

module.exports = loaders;
