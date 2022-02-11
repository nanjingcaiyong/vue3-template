import language from '@/language';
import { Plugin } from '@vue/runtime-core';


const MyPlugin: Plugin = {
  install: (Vue) => {
    // Vue.use(language);
  }
};

export default MyPlugin;