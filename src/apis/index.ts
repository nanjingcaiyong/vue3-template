import axios from '@utils/axios';
import { AxiosRequestConfig } from 'axios';
const files = require.context('.', true, /\.ts/);

type API = {
  [key: string]: <T>(params: any, resetConfig?: AxiosRequestConfig ) => Promise<T>
}

const configs: ApiConfig[] = files
  .keys()
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


export default configs.reduce<API>((modules, config) => {
  const apiName = `${config.moduleName}_${config.name}`;
  modules[apiName] = (params, resetConfig) => axios[config.type](config.path, params, resetConfig);
  return modules;
}, {});