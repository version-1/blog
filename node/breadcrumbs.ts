import {
  aboutPath,
  rootPath,
  categoryPath,
  tagPath,
  monthArchivePath,
} from '../src/lib/routes'
import { instance } from '../src/lib/i18next'
import { Lang } from 'gatsby-node/index.d'

const collections = (language: Lang) => ({
  top: {
    path: rootPath(language),
    label: 'Top',
  },
  categories: (category: string, language: Lang) => {
    return {
      path: categoryPath(category, language),
      label: instance.t(`categories.${category}`),
    };
  },
  tags: (tag: string, language: Lang) => {
    return {
      path: tagPath(tag, language),
      label: instance.t(`tags.${tag}`),
    };
  },
  about: {
    path: aboutPath(language),
    label: instance.t(`about.profile`),
  },
  monthArchive: (month: string, language: Lang) => {
    return {
      path: monthArchivePath(month, language),
      label: month,
    };
  },
})

export const fetch = (language: Lang) => {
  instance.changeLanguage(language);
  return collections(language);
};

