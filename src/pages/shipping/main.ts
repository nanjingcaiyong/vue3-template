import { createApp } from 'vue';
import App from './app.vue';
import createI18n from '@/site';
// import Language from '@/plugins/LanguagePlugin';
createApp(App)
  .use(createI18n())
  .mount('#shipping');