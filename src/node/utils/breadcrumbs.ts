import { blog } from '../../lib/routes'
import { instance } from '../../lib/i18next'
import { Lang } from '../pages/index.d'

const collections = (language: Lang) => ({
  top: {
    path: blog.rootPath(language),
    label: 'Top'
  },
  categories: (category: string, language: Lang) => {
    return {
      path: blog.categoryPath(category, language),
      label: instance.t(`categories.${category}`)
    }
  },
  tags: (tag: string, language: Lang) => {
    return {
      path: blog.tagPath(tag, language),
      label: instance.t(`tags.${tag}`)
    }
  },
  about: {
    path: blog.aboutPath(language),
    label: instance.t(`about.profile`)
  },
  monthArchive: (month: string, language: Lang) => {
    return {
      path: blog.monthArchivePath(month, language),
      label: month
    }
  }
})

export const fetch = (language: Lang) => {
  instance.changeLanguage(language)
  return collections(language)
}
