const {
  aboutPath,
  rootPath,
  categoryPath,
  monthArchivePath,
} = require('../src/lib/routes');
const i18next = require('../src/lib/i18next');
const breadcrumbs = {
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
  about: {
    path: aboutPath(),
    label: 'プロフィール',
  },
  monthArchive: month => {
    return {
      path: monthArchivePath(month),
      label: month,
    };
  },
};

module.exports = {
  breadcrumbs,
};
