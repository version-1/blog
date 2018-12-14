import i18next from 'i18next';
import enLocales from '../locales/en/index';
import jaLocales from '../locales/ja/index';

i18next
  .init({
    fallbackLng: 'ja',
    debug: true,
    resources: {
      en: {
        translation: enLocales
      },
      ja: {
        translation: jaLocales
      }
    }
  });

export default i18next
