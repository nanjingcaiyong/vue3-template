import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '../config';
const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = function (options:any) {
  const generateLoaders = (loader: string, loaderOptions?:any) => {
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
    generateLoaders('scss'),
    {
      test: /\.css$/,
      use:[
        // MiniCssExtractPlugin.loader,
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ] 
    },
  ];
};

const loaders = cssLoaders({
  sourceMap: devMode
    ? config.build.sourceMap
    : config.dev.sourceMap,
});

export default loaders;
