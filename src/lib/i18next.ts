import i18next from 'i18next'
import enLocales from '../locales/en'
import jaLocales from '../locales/ja'

i18next.init({
  fallbackLng: 'ja',
  resources: {
    en: {
      translation: enLocales.module,
    },
    ja: {
      translation: jaLocales.module,
    },
  }
})

export const instance = i18next
