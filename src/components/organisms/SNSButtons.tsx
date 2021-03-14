import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  PocketShareButton,
  HatenaShareButton,
  HatenaIcon,
  PocketIcon,
  FacebookIcon,
  TwitterIcon,
  RedditIcon
} from 'react-share'

const SIZE = 28

const SnsButtons = ({ type, url, title }: any) => {
  return (
    <ul className={`sns-buttons ${type}`}>
      <li className="js-ga-click-sns-twitter">
        <TwitterShareButton url={url}>
          <TwitterIcon size={SIZE} round />
        </TwitterShareButton>
      </li>
      <li className="js-ga-click-sns-facebook">
        <FacebookShareButton url={url}>
          <FacebookIcon size={SIZE} round />
        </FacebookShareButton>
      </li>
      <li className="js-ga-click-sns-reddit">
        <RedditShareButton url={url}>
          <RedditIcon size={SIZE} round />
        </RedditShareButton>
      </li>
      <li className="js-ga-click-sns-pocket">
        <PocketShareButton url={url}>
          <PocketIcon size={SIZE} round />
        </PocketShareButton>
      </li>
      <li className="js-ga-click-sns-hatebu">
        <HatenaShareButton url={url}>
          <HatenaIcon size={SIZE} round />
        </HatenaShareButton>
      </li>
    </ul>
  )
}

export default SnsButtons
