import { createApp } from 'vue';
import App from './app.vue';
import CupsheElement from 'cupshe-element';

createApp(App)
  .use(CupsheElement)
  .mount('#test');