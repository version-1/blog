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
import Styles from 'lib/styles'

const SIZE = 24

const styles = new Styles({
  container: `
    display: flex;
  `
}).style

const SnsButtons = ({ type, url, size = SIZE }: any) => {
  return (
    <ul css={styles.container} >
      <li className="js-ga-click-sns-twitter">
        <TwitterShareButton url={url}>
          <TwitterIcon size={size} round />
        </TwitterShareButton>
      </li>
      <li className="js-ga-click-sns-facebook">
        <FacebookShareButton url={url}>
          <FacebookIcon size={size} round />
        </FacebookShareButton>
      </li>
      <li className="js-ga-click-sns-reddit">
        <RedditShareButton url={url}>
          <RedditIcon size={size} round />
        </RedditShareButton>
      </li>
      <li className="js-ga-click-sns-pocket">
        <PocketShareButton url={url}>
          <PocketIcon size={size} round />
        </PocketShareButton>
      </li>
      <li className="js-ga-click-sns-hatebu">
        <HatenaShareButton url={url}>
          <HatenaIcon size={size} round />
        </HatenaShareButton>
      </li>
    </ul>
  )
}

export default SnsButtons
