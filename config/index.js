const path = require('path');

// const envObj = await import(`./${process.argv[2]}.env.js`);

const envObj = require(`./${process.argv[2]}.env.js`);

/**
 * @description ESM解析项目路径
 * @param {*} dir 跟目录下文件夹名称
 * @returns 
 */
function resolve (dir) {
  // const res = /(?<=\:).+/.exec(path.dirname(path.normalize(import.meta.url)));
  // return Array.isArray(res) && typeof res[0] === 'string' 
  //   ? path.join(res[0], dir) 
  //   : '/';
  return path.resolve(__dirname, dir);
}

module.exports = {
  build: {
    env: envObj, // 环境配置
    assetsRoot: resolve('../dist'), // 生成文件路径
    staticDirectory: 'static', // 静态文件夹
    assetsPublicPath: '/'
  },
  dev: {
    env: envObj, // 环境配置
    publicPath: '/',
    assetsPublicPath: '/'
  }
};