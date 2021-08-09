// import language from '@/language';
import { Plugin } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';


const MyPlugin: Plugin = {
  install: () => {
    const prefixReg = /[\.]\w+/g;
    // const hostPrefix = window.location.host.replace(prefixReg, ''); 
    const { locale } = useI18n();
    locale.value = 'de';
    // Vue.config.globalProperties.$t = language;
  }
};

export default MyPlugin;