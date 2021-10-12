import apis from '../apis';
import { Plugin } from '@vue/runtime-core';


const MyPlugin: Plugin = {
  install: Vue => {
    Vue.config.globalProperties.$api = apis;
  }
};

export default MyPlugin;