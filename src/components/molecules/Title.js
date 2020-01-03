import React from 'react';
import i18next from 'lib/i18next';

const Title = props => {
  const title = props.title || i18next.t(props.label)
  return (
    <div className="section-title">
      <span className="square square-black">■</span>
      <span className="square square-green">■</span>
      <span className="square square-black">■</span>
      <span className="title">{title}</span>
      <span className="square square-black">■</span>
      <span className="square square-orange">■</span>
      <span className="square square-black">■</span>
    </div>
  );
};

export default React.memo(Title);
