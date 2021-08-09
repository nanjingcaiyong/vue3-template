import path from 'path';
// ES Module 才可以使用顶级await
const envObj = require(`./${process.argv[2]}.env`).default;

/**
 * @description ESM解析项目路径
 * @param {*} dir 跟目录下文件夹名称
 * @returns 
 */
function resolve (dir: string): string {
  const __dirname = path.resolve();
  return path.resolve(__dirname, dir);
}

export type BaseConfig = {
  productionSourceMap?: boolean;
  devtool?: string;
  index?: string;
  env: any; // 环境配置
  publicPath?: string;
  sourceMap: boolean;
  assetsRoot: string; // 生成文件路径
  assetsSubDirectory: string; // 静态文件夹
  assetsPublicPath: string;
  bundleAnalyzerReport: boolean;
}

export interface IConfig {
  build: BaseConfig,
  dev: Partial<BaseConfig>
}

const config:IConfig = {
  build: {
    // Template for index.html
    index: resolve('./dist/index.html'),
    // Paths
    assetsRoot: resolve('./dist'), // 生成文件路径
    assetsSubDirectory: 'static', // 静态文件夹
    assetsPublicPath: '/',

    productionSourceMap: true,
    sourceMap: false,
    env: envObj, // 环境配置
    bundleAnalyzerReport: Boolean(process.env.npm_config_report)
  },
  dev: {
    sourceMap: true,
    env: envObj, // 环境配置
    publicPath: '/',
    assetsPublicPath: '/'
  }
};

export default config;