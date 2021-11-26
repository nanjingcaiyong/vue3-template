import path from 'path';
let envObj = {};
(async () => {
  envObj = await import(`./${process.argv[2]}.env`);
})();
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
  env: any, // 环境配置
  publicPath?: string,
  sourceMap: boolean,
  assetsRoot?: string, // 生成文件路径
  staticDirectory?: string, // 静态文件夹
  assetsPublicPath: string
}

export interface IConfig {
  build: BaseConfig,
  dev: BaseConfig
}

const config:IConfig = {
  build: {
    sourceMap: false,
    env: envObj, // 环境配置
    assetsRoot: resolve('../dist'), // 生成文件路径
    staticDirectory: 'static', // 静态文件夹
    assetsPublicPath: '/'
  },
  dev: {
    sourceMap: true,
    env: envObj, // 环境配置
    publicPath: '/',
    assetsPublicPath: '/'
  }
};

export default config;