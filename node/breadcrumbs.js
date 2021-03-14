const {
  aboutPath,
  rootPath,
  categoryPath,
  tagPath,
  monthArchivePath,
} = require('../src/lib/routes');
const i18next = require('../src/lib/i18next');

const collections = language => ({
  top: {
    path: rootPath(language),
    label: 'Top',
  },
  categories: (category, language) => {
    return {
      path: categoryPath(category, language),
      label: i18next.t(`categories.${category}`),
    };
  },
  tags: (tag, language) => {
    return {
      path: tagPath(tag, language),
      label: i18next.t(`tags.${tag}`),
    };
  },
  about: {
    path: aboutPath(language),
    label: i18next.t(`about.profile`),
  },
  monthArchive: (month, language) => {
    return {
      path: monthArchivePath(month, language),
      label: month,
    };
  },
});

const fetch = language => {
  i18next.default?.changeLanguage(language);
  return collections(language);
};

module.exports = {
  fetch,
};
