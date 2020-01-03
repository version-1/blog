import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import slack from 'slack-notify';
import {batchEventRegister} from 'ga-event-tracker-on-site';

import Navbar from 'components/Navbar';
import Head from 'components/Head';
import 'assets/stylesheets/index.sass';
import {constants} from 'config/constants';

const notifier = slack(constants.slackWebhookUrl);

export default class IndexLayout extends React.PureComponent {
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') return;
    batchEventRegister(window, constants.selectors, 'click', {
      afterCallback: (ga, ele, params) => {
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
    const {language, amp, baseUrl} = this.props;
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
            <Navbar language={language} amp={amp} />
            <div>{children}</div>
            <div className="footer">
              <span className="copyright">
                Copyright © 2018 So Far , So Tech All Rights Reserved.
              </span>
            </div>
          </div>
        )}
      />
    );
  }
}
