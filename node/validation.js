const _ = require('lodash');
const {constants} = require('../config/constants');

const CATEGORY_LIST = constants.categories;
const TAG_LIST = constants.tags;

const validateCategoryList = (node, categories) => {
  const diff = _.difference(categories, CATEGORY_LIST).length > 0;
  if (diff.length > 0) {
    console.error('category not found', diff, node);
    throw new Error();
  }
};

const validateTagList = (node, tags) => {
  const diff = _.difference(tags, TAG_LIST).length > 0;
  if (diff.length > 0) {
    console.error('tags not found', diff, node);
    throw new Error();
  }
};

module.exports = {
  validateCategoryList,
  validateTagList
}
