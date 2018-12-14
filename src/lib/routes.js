import {routes} from '../../config/constants';

const buildPath = paths => [ routes.index, ...paths].join('/').replace('//', '/');

export const rootPath = () => routes.index
export const aboutPath = () => buildPath(['about']);
export const categoryPath = category =>
  buildPath([routes.category, category]);

