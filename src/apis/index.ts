import axios from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';
// const 
let configs: ApiConfig[] = [];
if (process.env.NODE_ENV !== 'production') {
  // const files = import.meta.globEager('./*.ts');
  const files = require.context('.', true, /\.ts/);
  configs = Object.keys(files)
    .reduce<ApiConfig[]>(
      (list, modulePath) => {
        const moduleName = /\w+/.exec(modulePath)?.[0]?.toUpperCase(); // 模块名大写
        if (modulePath && modulePath !== './index.ts') {
          (files[modulePath]?.default || [])
            .forEach((module: ApiConfig) => {
              list.push(Object.assign({}, module, { moduleName: moduleName}));
            });
        }
        return list;
      }, []
    );
} else {
  const files = require.context('.', true, /\.ts/);
  configs = Object.keys(files)
    .reduce<ApiConfig[]>(
      (list, modulePath) => {
        const moduleName = /\w+/.exec(modulePath)?.[0]?.toUpperCase(); // 模块名大写
        if (modulePath && modulePath !== './index.ts') {
          (files(modulePath)?.default || [])
            .forEach((module: ApiConfig) => {
              list.push(Object.assign({}, module, { moduleName: moduleName}));
            });
        }
        return list;
      }, []
    );
}


type FourElements = {
  brandId: number;
  channelId: number;
  siteId: number;
  terminalId: number;
}


const apis = (extraParams?: any) => {
  extraParams = extraParams ?? {};
  return configs.reduce<API>((modules, config) => {
    const apiName = `${config.moduleName}_${config.name}`;
    modules[apiName] = (obj, resetConfig) => {
      const newsParams = config.type.toUpperCase() === 'POST'
        ? Object.assign(obj, extraParams)
        : { params: Object.assign(obj.params, extraParams) };
      return axios[config.type](config.path, newsParams, resetConfig);
    };
    return modules;
  }, {});
};

/**
 * @description 设置四要素
 * @param { fourElements } 四要素 
 * @returns 
 */
const setFourElements = (fourElements: FourElements): API => {
  return apis(fourElements);
};

/**
 * @description 设置请求头
 * @param header 
 * @returns 
 */
const setHeader = (header: AxiosRequestConfig): API => {
  return configs.reduce<API>((modules, config) => {
    const apiName = `${config.moduleName}_${config.name}`;
    modules[apiName] = (params, resetConfig = {}) => axios[config.type](config.path, params, Object.assign(header, resetConfig));
    return modules;
  }, {});
};

export default apis();

export {
  setHeader,
  setFourElements
};