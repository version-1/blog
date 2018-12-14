import {routes} from '../../config/constants';

const buildPath = paths =>
  [routes.index, ...paths].join('/').replace('//', '/');

export const rootPath = () => routes.index;
export const aboutPath = () => buildPath(['about']);
export const postPath = () => buildPath([routes.post]);
export const categoryPath = category => {
  if (!category) return buildPath([routes.category]);
  return buildPath([routes.category, category]);
};
