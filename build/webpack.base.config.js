const VueLoader = require('vue-loader');
const webpack = require('webpack');
const fs = require('fs');
const config = require('../config/index.js');
const routers = require('../src/router');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

const { ModuleFederationPlugin } = webpack.container;
const { VueLoaderPlugin } = VueLoader;
const loaders = require('./vue-loader.config.js');
const moduleName = process.argv[3]; // 获取脚本参数

const devMode = process.env.NODE_ENV !== 'production';

/**
 * @description 根据src下目录结构或命令行参数动态配置入口
 * @param { string } rootName 多页父级目录
 * @param { string } moduleName 指定的页面名称
 * @returns { Object } entry
 */
function getEntries (rootName, moduleName) {
  if (fs.existsSync(rootName)) {
    return moduleName === undefined 
      ? fs.readdirSync(rootName).reduce((entry,pageName) => {
        entry[pageName] = `./${rootName}/${pageName}/index.ts`;
        return entry;
      }, {})
      : {[moduleName]: `./${rootName}/${moduleName}/index.ts`};
  }
  throw new Error('The pages folder is missing in the src directory');
}

const entryObj = getEntries('src/pages', moduleName);

/**
 * @description 添加配置多入口的htmlplugin
 * @param {*} pageNames 所有的pagename
 * @param {*} baseConfig 基础配置
 */
function appendHtmlPlugins (pageNames, baseConfig) {
  routers.forEach(page => {
    baseConfig.plugins.push(new HtmlWebpackPlugin({
      template: `./src/pages/${page.name}/index.html`, 
      filename: `${page.path}/index.html`,
      app: `<div id="${page.name}"></div>`,
      title: page.title,
      chunks: [page.name], // 防止其他page打包后的css、js引入所有的html
      hash: true
    }));
  });
}

const baseConfig = {
  experiments: {
    topLevelAwait: true, // 能够在顶层使用await, 方便es6动态导入(仅支持webpack5)
  },
  entry: {
    ...entryObj,
    vendor: ['vue'],
  },
  target: 'web',
  output: {
    path: config.build.assetsRoot,
    filename: '[name]-[contenthash].js',
    publicPath: devMode
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath,
    clean: true // webpack5不需要clean-webpack-plugin，会自动追踪新增、删除、修改的文件
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    // 别名配置，需要同步tsconfig.json中paths字段
    alias: {
      'vue': '@vue/runtime-dom',
      '@utils': '/utils', // 每当引模块的时候，它会直接从映射的路径引入而不需要按模块的查找规则查找, 加快 webpack 查找模块的速度
      '@': '/src',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          // 开启多线程池  弊端开线程和线程通信需要时间的
          {
            loader: 'thread-loader',
            options: { workers: 3 }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 自动babel缓存
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
      },
      ...loaders
    ]
  },
  plugins: [
    new WebpackBar(),
    new VueLoaderPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   // filename: "vendor.js"
    //   // (Give the chunk a different name)

    //   minChunks: Infinity,
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),
    new ModuleFederationPlugin({
      name: 'shopifyApp',
      filename: 'shopifyUI.js',
      remotes: {
        importShopifyUI: 'shopifyUI@http://localhost:8081/shopifyUI.js',
      },
      exposes: {},
    }),
  ]
};

devMode || baseConfig.plugins.push(new MiniCssExtractPlugin({
  filename: '[name]/css/[name].css' ,
  chunkFilename: '[name]/css/[id].css' ,
}));

appendHtmlPlugins(Object.keys(entryObj) ,baseConfig);

module.exports = baseConfig;