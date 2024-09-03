const routes = {
  root: '/',
  index: '/',
  about: 'about',
  post: 'posts',
  category: 'categories',
  tag: 'tags',
  populars: 'populars',
  pickups: 'pickups',
}

const joinLangRoot = (language: Lang, path: string) =>
  ['/', language, path].join('')

type Lang = 'ja' | 'en'

export const normalizeSlash = (path: string): string => {
  let res = path
  while (res.includes('//')) {
    res = res.replace('//', '/')
  }

  return res
}

const buildPath = (paths: string[], language: Lang = 'ja') => {
  const path = [routes.index, ...paths].join('/')
  if (!language || language === 'ja') {
    return normalizeSlash(path)
  }

  return normalizeSlash(joinLangRoot(language, path))
}

const rootPath = (language: Lang) =>
  buildPath([language === 'ja' ? routes.index : joinLangRoot(language, '')])
const aboutPath = (language: Lang) => buildPath([routes.about], language)
const postPath = (language: Lang) => buildPath([routes.post], language)
const popularsPath = (language: Lang) => buildPath([routes.populars], language)
const pickupsPath = (language: Lang) => buildPath([routes.pickups], language)
const postShowPath = (slug: string, language: Lang) =>
  buildPath([slug], language)
const categoryPath = (category: string, language: Lang) => {
  if (!category) return buildPath([routes.category], language)
  return buildPath([routes.category, category], language)
}
const tagPath = (tag: string, language: Lang) => {
  if (!tag) return buildPath([routes.tag], language)
  return buildPath([routes.tag, tag], language)
}

const monthArchivePath = (month: string, language: Lang) => {
  return buildPath(month.split('/'), language)
}

export const blog = {
  basePath: '/',
  rootPath,
  aboutPath,
  postPath,
  popularsPath,
  pickupsPath,
  postShowPath,
  categoryPath,
  tagPath,
  monthArchivePath
}

