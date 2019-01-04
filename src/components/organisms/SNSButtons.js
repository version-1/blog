import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  GooglePlusIcon,
  TwitterIcon,
  RedditIcon,
} from 'react-share';
import HatenaButton from '../../components/atoms/buttons/HatenaButton';
import PocketButton from '../../components/atoms/buttons/PocketButton';

const SnsButtons = ({type, amp, url, title}) => {
  return (
    <div className={`sns-buttons ${type}`}>
      <TwitterShareButton url={url}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon size={40} round />
      </GooglePlusShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={40} round />
      </RedditShareButton>
      <PocketButton amp={amp} url={url} title={title} />
      <HatenaButton amp={amp} url={url} title={title} size={80} />
    </div>
  );
};

export default SnsButtons;
