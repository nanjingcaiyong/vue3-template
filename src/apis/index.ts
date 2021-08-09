import { AxiosRequestConfig } from 'axios';
import { createAxios } from 'cupshe-axios';
const files = require.context('.', true, /(?<!index)\.ts/);
const instance = createAxios({
  timeout: 5000
});
 
const configs: ApiConfig[] = files
  .keys()
  .reduce<ApiConfig[]>(
    (list, modulePath) => {
      const moduleName = /\w+/.exec(modulePath)?.[0]?.toUpperCase(); // 模块名大写
      (files(modulePath)?.default || [])
        .forEach((module: ApiConfig) => {
          list.push(Object.assign({}, module, { moduleName: moduleName}));
        });
      return list;
    }, []
  );

 
const apis = configs.reduce((modules: any, config) => {
  const apiName = `${config.moduleName}_${config.name}`;
  modules[apiName] = (obj: any, resetConfig?: AxiosRequestConfig<any>) => {
    if (['POST', 'CANCELPOST'].includes(config.type.toUpperCase())) {
      return instance[config.type](config.path, obj, resetConfig);
    } 
    return instance[config.type](config.path, obj);
  };
  return modules;
}, {});

export default apis;
