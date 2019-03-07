import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import slack from 'slack-notify';
import {batchEventRegister} from 'ga-event-tracker-on-site';
import headerImage from 'assets/images/header-image-2.svg';
import headerImageSmall from 'assets/images/header-image-small.svg';
import footerImage from 'assets/images/footer-image.svg';

import Img from 'components/atoms/Image';
import Navbar from 'components/Navbar';
import Head from 'components/Head';
import 'assets/stylesheets/index.sass';
import {constants} from 'config/constants';

const selectors = [
  '.js-ga-click-levatech-freelance',
  '.js-ga-click-it-propartners',
  '.js-ga-click-potepan-freelance',
  '.js-ga-click-book-marketing-sence',
  '.js-ga-click-sns-twitter',
  '.js-ga-click-sns-facebook',
  '.js-ga-click-sns-google-plus',
  '.js-ga-click-sns-reddit',
  '.js-ga-click-sns-pocket',
  '.js-ga-click-sns-hatebu',
];
const notifier = slack(constants.slackWebhookUrl);

export default class IndexLayout extends React.PureComponent {
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') return;
    batchEventRegister(window, selectors, 'click', {
      afterCallback: (ga, ele, params) => {
        const { eventCategory, eventAction, eventLabel } = params
        notifier.send({
          channel: '#event',
          icon_emoji: ':ghost:',
          text: 'event fire',
          fields: params,
        });
      },
    });
  }

  render() {
    const {amp, baseUrl} = this.props;
    const {children} = this.props;
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}
        render={data => (
          <div>
            <Head
              amp={amp}
              baseUrl={baseUrl}
              siteTitle={data.site.siteMetadata.title}
              description={data.site.siteMetadata.description}
            />
            <div className="header-image hide-on-med-and-down">
              <Img
                amp={amp}
                width={4000}
                height={300}
                layout="fixed"
                src={headerImage}
                alt="header image"
              />
            </div>
            <div className="header-image-small hide-on-large-only">
              <Img
                amp={amp}
                width={2000}
                height={150}
                layout="fixed"
                src={headerImageSmall}
                alt="header image"
              />
            </div>
            <Navbar amp={amp} />
            <div>{children}</div>
            <div className="footer">
              <span className="copyright">
                Copyright © 2018 So Far , So Tech All Rights Reserved.
              </span>
            </div>
            <div className="footer-image">
              <Img
                amp={amp}
                width={4000}
                height={300}
                layout="fixed"
                src={footerImage}
                alt="footer image"
              />
            </div>
          </div>
        )}
      />
    );
  }
}
