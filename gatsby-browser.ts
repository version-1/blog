import * as i18next from './src/lib/i18next'

export const wrapPageElement = ({ element, props }: any) => {
  const { language } = props.pageContext
  i18next.instance?.changeLanguage(language)
  return element
}
