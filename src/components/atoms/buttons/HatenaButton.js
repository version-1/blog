import React from 'react';
import Img from 'components/atoms/Image';

const defaultSize = 40;
const HatenaButton = ({url, title, size = defaultSize}) => {
  const imageSize = size / 2;
  return (
    <>
      <a
        href={`http://b.hatena.ne.jp/entry/${url}`}
        className="hatena-bookmark-button share-btn"
        data-hatena-bookmark-layout="touch-counter"
        data-hatena-bookmark-width={size}
        data-hatena-bookmark-height={size}
        title="このエントリーをはてなブックマークに追加">
        <Img
          src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
          alt="このエントリーをはてなブックマークに追加"
          width={imageSize}
          height={imageSize}
          style={{ border: 'none' }}
        />
      </a>
    </>
  );
};

export default HatenaButton;
