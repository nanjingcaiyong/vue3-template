import { createApp } from 'vue';
import App from './app.vue';
import createI18n from '@/site';
import 'tailwindcss/tailwind.css';


async function bootstrap () {
  const app = createApp(App);
  app.use(createI18n());
  app.mount('#language');
}

bootstrap();