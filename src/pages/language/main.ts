import { createApp } from 'vue';
import App from './app.vue';
import i18n from '@/language';


async function bootstrap () {
  const app = createApp(App);
  app.use(i18n);
  app.mount('#language');
}

bootstrap();