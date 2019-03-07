import React from 'react'
import i18next from 'lib/i18next';
import {tagPath} from 'lib/routes';
const TagList = ({list, delimiter}) => {
  return list.map((tag, index) => {
    const name = i18next.t(`tags.${tag}`);
    return (
      <a key={tag} href={tagPath(tag)} className="tag btn-flat">
        {name}
      </a>
    );
  });
};

export default TagList
