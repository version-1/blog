require('prismjs/themes/prism-tomorrow.css')
const i18next = require('./src/lib/i18next')

exports.wrapPageElement = ({ element, props }) => {
  const { language } = props.pageContext
  i18next.default?.changeLanguage(language)
  return element
}
