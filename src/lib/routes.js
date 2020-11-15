const { routes } = require('../../config/constants')

const joinLangRoot = (language, path) => ['/', language, path].join('')

const buildPath = (paths, language = 'ja') => {
  const path = [routes.index, ...paths]
    .join('/')
    .replace('///', '/')
    .replace('//', '/')
  if (!language || language === 'ja') {
    return path
  }
  return joinLangRoot(language, path)
}

const rootPath = language =>
  language === 'ja' ? routes.index : joinLangRoot(language, '')
const aboutPath = language => buildPath(['about'], language)
const postPath = language => buildPath([routes.post], language)
const postShowPath = (slug, language) => buildPath([slug], language)
const categoryPath = (category, language) => {
  if (!category) return buildPath([routes.category], language)
  return buildPath([routes.category, category], language)
}
const tagPath = (tag, language) => {
  if (!tag) return buildPath([routes.tag], language)
  return buildPath([routes.tag, tag], language)
}
const monthArchivePath = (month, language) => {
  return buildPath(month.split('/'), language)
}

module.exports = {
  aboutPath,
  rootPath,
  buildPath,
  postPath,
  postShowPath,
  categoryPath,
  tagPath,
  monthArchivePath,
}
