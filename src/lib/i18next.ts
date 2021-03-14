const i18next = require('i18next')
const enLocales = require('../locales/en/index')
const jaLocales = require('../locales/ja/index')

i18next.default?.init({
  fallbackLng: 'ja',
  resources: {
    en: {
      translation: enLocales,
    },
    ja: {
      translation: jaLocales,
    },
  },
})

module.exports = i18next
