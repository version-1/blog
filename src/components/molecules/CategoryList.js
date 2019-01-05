import React from 'react'
import i18next from '../../lib/i18next';
import {categoryPath} from '../../lib/routes';
const CategoryList = ({list}) => {
  return list.map((category, index) => {
    const name = i18next.t(`categories.${category}`);
    return (
      <a key={category} href={categoryPath(category)} className="category btn-flat">
        {name}
        {index === list.length - 1 ? '' : ',  '}
      </a>
    );
  });
};

export default CategoryList
