const {
  aboutPath,
  rootPath,
  categoryPath,
  tagPath,
  monthArchivePath,
} = require('../src/lib/routes');
const i18next = require('../src/lib/i18next');

const collections = () => ({
  top: {
    path: rootPath(),
    label: 'Top',
  },
  categories: category => {
    return {
      path: categoryPath(category),
      label: i18next.t(`categories.${category}`),
    };
  },
  tags: tag => {
    return {
      path: tagPath(tag),
      label: i18next.t(`tags.${tag}`),
    };
  },
  about: {
    path: aboutPath(),
    label: i18next.t(`about.profile`),
  },
  monthArchive: month => {
    return {
      path: monthArchivePath(month),
      label: month,
    };
  },
});

const fetch = language => {
  i18next.changeLanguage(language);
  return collections();
};

module.exports = {
  fetch,
};
