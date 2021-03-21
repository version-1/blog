import config from '../../config/constants'
const { routes } = config

const joinLangRoot = (language: Lang, path: string) => ['/', language, path].join('')

type Lang = 'ja' | 'en'

const buildPath = (paths: string[], language: Lang = 'ja') => {
  const path = [routes.index, ...paths]
    .join('/')
    .replace('///', '/')
    .replace('//', '/')
  if (!language || language === 'ja') {
    return path
  }
  return joinLangRoot(language, path)
}

export const rootPath = (language: Lang) =>
  language === 'ja' ? routes.index : joinLangRoot(language, '')
export const aboutPath = (language: Lang) => buildPath(['about'], language)
export const postPath = (language: Lang) => buildPath([routes.post], language)
export const postShowPath = (slug: string, language: Lang) => buildPath([slug], language)
export const categoryPath = (category: string, language: Lang) => {
  if (!category) return buildPath([routes.category], language)
  return buildPath([routes.category, category], language)
}
export const tagPath = (tag: string, language: Lang) => {
  if (!tag) return buildPath([routes.tag], language)
  return buildPath([routes.tag, tag], language)
}
export const monthArchivePath = (month: string, language: Lang) => {
  return buildPath(month.split('/'), language)
}

