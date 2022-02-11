import { createI18n } from 'vue-i18n';
import zhCN from './zhCN';
import en from './en';
import de from './de';
import fr from './fr';

const i18n = createI18n({
  locale: 'zhCN',
  messages: {
    zhCN,
    en,
    de,
    fr
  },
});

export default i18n;