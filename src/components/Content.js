import React from 'react';
import PropTypes from 'prop-types';
import { insertInArticle } from '../lib/adsense'

export const HTMLContent = ({content, className}) => {
  const __html = insertInArticle(content)
  return <div className={className} dangerouslySetInnerHTML={{__html}} />;
};

const Content = ({content, className}) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
