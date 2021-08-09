import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';
import fs from 'fs';
import config from '../config';
import routers from '../src/router';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import path from 'path';

const { ModuleFederationPlugin } = webpack.container;
import loaders from './vue-loader.config';
const moduleName = process.argv[3]; // 获取脚本参数

const devMode = process.env.NODE_ENV !== 'production';

/**
 * @description 根据src下目录结构或命令行参数动态配置入口
 * @param { string } rootName 多页父级目录
 * @param { string } moduleName 指定的页面名称
 * @returns { Object } entry
 */
function getEntries (rootName: string, moduleName: string) {
  if (fs.existsSync(rootName)) {
    return moduleName === undefined 
      ? fs.readdirSync(rootName).reduce((entry: any,pageName) => {
        entry[pageName] = `./${rootName}/${pageName}/main.ts`;
        return entry;
      }, {})
      : {[moduleName]: `./${rootName}/${moduleName}/main.ts`};
  }
  throw new Error('The pages folder is missing in the src directory');
}

const entryObj = getEntries('src/pages', moduleName);

/**
 * @description 添加配置多入口的htmlplugin
 * @param {*} pageNames 所有的pagename
 * @param {*} baseConfig 基础配置
 */
function appendHtmlPlugins (_pageNames:any, baseConfig:any) {
  routers.forEach(page => {
    (baseConfig?.plugins || [])?.push(new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      template: `./src/pages/${page.name}/index.html`, 
      filename: `${page.path}/index.html`,
      app: `<div id="${page.name}"></div>`,
      title: page.title,
      chunks: [page.name], // 防止其他page打包后的css、js引入所有的html
      hash: true
    }));
  });
}

const baseConfig: webpack.Configuration = {
  experiments: {
    // asyncWebAssembly: true,
    // layers: true,
    // lazyCompilation: true,
    // outputModule: true,
    // syncWebAssembly: true,
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
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-top-level-await'],
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
    new WebpackBar({}),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': JSON.stringify(Object.assign({}, config.build.env, {language})),
      'process.env': JSON.stringify(config.build.env)
    }),
    new webpack.ProvidePlugin({
      $API: [path.resolve(__dirname, '../src/apis'), 'default'],
    }),
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

appendHtmlPlugins(Object.keys(entryObj) ,baseConfig);

export default baseConfig;