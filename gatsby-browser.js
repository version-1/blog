const i18next = require('./src/lib/i18next')

exports.wrapPageElement = ({ element, props }) => {
  const { language } = props.pageContext
  i18next.instance?.changeLanguage(language)
  return element
}
