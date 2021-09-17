import axios, { IResponse } from '@utils/axios';
const files = require.context('.', true, /\.ts/);

const configs: ApiConfig[] = files.keys()
  .reduce(
    (list, module) => list.concat(module === './index.ts' ? [] : files(module).default), 
    []
  );

type Request = (params: any) => Promise<IResponse>

export default configs.reduce((modules: {[key: string]: Request}, config) => {
  modules[config.name] = params => axios[config.type](config.path, params);
  return modules;
}, {});
 