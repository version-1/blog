import React from 'react'
import i18next from '../../lib/i18next';
import {categoryPath} from '../../lib/routes';
const CategoryList = ({list, delimiter}) => {
  return list.map((category, index) => {
    const name = i18next.t(`categories.${category}`);
    return (
      <a key={category} href={categoryPath(category)} className="category btn-flat">
        {name}
      </a>
    );
  });
};

export default CategoryList
