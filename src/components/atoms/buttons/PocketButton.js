import React from 'react';
import Img from '../../../components/atoms/Image';
import pocketIcon from '../../../assets/images/pocket-icon-color.svg';
const defaultSize = 45;

const PocketButton = ({amp, url, title, size = defaultSize}) => {
  const shareLink = `http://getpocket.com/edit?url=${url}&title=${title}`;
  return (
    <a
      className="share-btn pocket-btn"
      href={shareLink}
      rel="nofollow noopener noreferrer"
      target="_blank">
      <Img amp={amp} src={pocketIcon} width={size} height={size} />
    </a>
  );
};

export default PocketButton;
