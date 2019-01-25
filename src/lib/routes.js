const {routes} = require('../../config/constants');

const buildPath = paths =>
  [routes.index, ...paths].join('/').replace('//', '/');

const rootPath = () => routes.index;
const aboutPath = () => buildPath(['about']);
const postPath = () => buildPath([routes.post]);
const categoryPath = category => {
  if (!category) return buildPath([routes.category]);
  return buildPath([routes.category, category]);
};
const monthArchivePath = month => {
  return buildPath(month.split('/'));
};

module.exports = {
  aboutPath,
  rootPath,
  buildPath,
  postPath,
  categoryPath,
  monthArchivePath
}
