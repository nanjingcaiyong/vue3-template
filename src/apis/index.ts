import axios, { IResponse } from '@utils/axios';
const files = require.context('.', true, /\.ts/);
type Request = (params: any) => Promise<IResponse>

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

export default configs.reduce<{[key: string]: Request}>((modules, config) => {
  const apiName = `${config.moduleName}_${config.name}`;
  modules[apiName] = (params:any) => axios[config.type](config.path, params);
  return modules;
}, {});