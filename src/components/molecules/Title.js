import React from 'react';
import i18next from 'lib/i18next';

const Title = props => {
  return (
    <div className="section-title">
      <span class="square square-black">■</span>
      <span class="square square-green">■</span>
      <span class="square square-black">■</span>
      <span className="title">{i18next.t(props.label)}</span>
      <span class="square square-black">■</span>
      <span class="square square-orange">■</span>
      <span class="square square-black">■</span>
    </div>
  );
};

export default React.memo(Title);
