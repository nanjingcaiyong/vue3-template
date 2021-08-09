import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '../config';
const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = function (options:any) {
  const generateLoaders = (loader: string, loaderOptions?:any) => {
    return {
      test: new RegExp(`\\.${loader}$`),
      use: [
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
