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
      <div className="js-ga-click-sns-twitter">
        <TwitterShareButton url={url}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
      </div>
      <div className="js-ga-click-sns-facebook">
        <FacebookShareButton url={url}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </div>
      <div className="js-ga-click-sns-google-plus">
        <GooglePlusShareButton url={url}>
          <GooglePlusIcon size={40} round />
        </GooglePlusShareButton>
      </div>
      <div className="js-ga-click-sns-reddit">
        <RedditShareButton url={url}>
          <RedditIcon size={40} round />
        </RedditShareButton>
      </div>
      <div className="js-ga-click-sns-pocket">
        <PocketButton amp={amp} url={url} title={title} />
      </div>
      <div className="js-ga-click-sns-hatebu">
        <HatenaButton amp={amp} url={url} title={title} size={80} />
      </div>
    </div>
  );
};

export default SnsButtons;
