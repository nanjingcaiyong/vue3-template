import language from '../../language';
import { Plugin } from '@vue/runtime-core';


const MyPlugin: Plugin = {
  install: (Vue) => {
    Vue.config.globalProperties.$t = language;
  }
};

export default MyPlugin;