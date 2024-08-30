import * as i18next from './src/lib/i18next'
import './src/styles/global.css';

export const wrapPageElement = ({ element, props }: any) => {
  const { language } = props.pageContext
  i18next.instance?.changeLanguage(language)
  return element
}
